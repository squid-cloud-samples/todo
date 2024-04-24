## Getting Started
- In `main.tsx`, update the options passed `SquidContextProvider` with you `appId` and `squidDeveloperId`.
- Run the `Create .env file` script in (found in the [Squid Console](https://console.squid.cloud)) in the `backend` directory.
- Run `squid start` in the backend directory.

## Creating a Todo

Querying for todos. In `App.tsx` add the following:

```tsx
import { useCollection } from "@squidcloud/react"

const App = () => {
  const collection = useCollection('todos');
  // Replace `const data = []` with the following line:
  const { data } = useQuery(collection.query());

  ...
}
```

Creating a todo:

```typescript
const App = () => {
  ...

  const handleCreate = async (data) => {
    const { title, content } = data;
    const now = new Date();

    await collection.doc({ id: crypto.randomUUID() }).insert({
      title,
      content,
      createdAt: now,
      updatedAt: now,
      done: false,
    });
  }

  ...
};
```

## Updating a Todo

In `App.tsx`

```tsx
const App = () => {
  ...

  const handleToggle = async (id: string, done: boolean) => {
    await collection.doc({id}).update({
      done,
      updatedAt: new Date()
    });
  };

  ...
}
```

## Creating an Executable

In the `backend/src/services/example-service.ts`, add the following:

```typescript
import { executable } from "@squidcloud/backend"

export class ExampleService extends SquidService {
  ...

  @executable()
  async cleanTodos(): Promise<void> {
    await this.cleanTodosInternal();
  }

  private async cleanTodosInternal() {
    const todoRefs = await this.squid
      .collection("todos")
      .query()
      .eq("done", true)
      .snapshot();

    await this.squid.runInTransaction(async (txId) => {
      for (const todoRef of todoRefs) {
        void todoRef.delete(txId);
      }
    });
  }
}
```

Inside of in `App.tsx`

```tsx
import { useSquid } from "@squidcloud/react";

const App = () => {
  const squid = useSquid();

  ...

  const handleCleanTodos = async () => {
    await squid.executeFunction('cleanTodos');
  }

  ...
}
```

## Adding a Scheduler

Now addthe follo `@executable` with the following code:

```typescript
import { scheduler } from "@squidcloud/backend"
import { CronExpression } from "@squidcloud/client";

export class ExampleService extends SquidService {
  ...

  @scheduler({
    cron: CronExpression.EVERY_10_SECONDS
  })
  async cleanTodosOnSchedule(): Promise<void> {
    await this.cleanTodosInternal();
  }
}
```

## Adding a Trigger

Remove the `updatedAt: new Date()` following from `App.tsx`:

```tsx
const App = () => {
  ...

  const handleToggle = async (id: string, done: boolean) => {
    await collection.doc({id}).update({
      done,
    });
  };

  ...
}
```

And add the following in `example-service.ts`

```typescript
import { trigger, TriggerRequest } from "@squidcloud/backend";

export class ExampleService extends SquidService {
  ...

  @trigger({
    collection: "todos",
    mutationTypes: ["update"],
  })
  async onUpdateTodo(request: TriggerRequest): Promise<void> {
    const { docBefore, docAfter } = request;
    if (docBefore.done === docAfter.done) return;

    await this.squid.collection("todos").doc({ id: docAfter.id }).update({
      updatedAt: new Date(),
    });
  }

}
```

## Adding a Webhook

```typescript

import { webhook, WebhookRequest } from "@squidcloud/backend";

export class ExampleService extends SquidService {
  ...

  @webhook("createTodo")
  async createTodo(request: WebhookRequest): Promise<WebhookResponse> {
    const { title, content } = request.queryParams;
    if (!title || !content) {
      return this.createWebhookResponse("Invalid request", 400);
    }

    const id = await this.createTodoInternal(title, content)
    return this.createWebhookResponse(`Todo created: ${id}`, 200);
  }

  private async createTodoInternal(title: string, content: string): Promise<string> {
    const now = new Date();
    const id = crypto.randomUUID();

    await this.squid.collection("todos").doc({ id }).insert({
      title,
      content,
      createdAt: now,
      updatedAt: now,
      done: false,
    });

    return id;
  }
}
```

In the output of the locally running backend, you should see a log like:

```bash
Webhook URL for createTodo: https://{appId}-dev-{developerId}.us-east-1.aws.squid.cloud/webhooks/createTodo
```

Now:
Copy your version of this URL into a new browser window. and append the following, and press enter:

```typescript
?title=Test%20TODO&content=Test%20Content
```

## Adding AI

In `example-service.ts` we're going to create an AI assistant, which will automatically create todos based on a specified task.

```typescript
import { executable, aiFunction } from "@squidcloud/backend";

export class ExampleService extends SquidService {
  ...

  @executable()
  async createTodosWithAI(task: string): Promise<void> {
    const assistant = this.squid.ai().assistant();
    const assistantId = await assistant.createAssistant(
      "todoCreator",
      "Your are designed to create todo list items based on the specified task. You should create anywhere between 3-5 todos.",
      ["createTodoFromAssistant"],
    );
    const threadId = await assistant.createThread(assistantId);

    await assistant.queryAssistant(
      assistantId,
      threadId,
      `Create some todos for the following task: ${task}`,
    );
  }
}
```

In the assistants we've created above, we've passed it a `createTodoFromAssistant` function. This is the function we expect the assistant to call when it attempts to create
todo items. Let's define that below, using the same `createTodo` helper we definde in the previous step:

```typescript
export class ExampleService extends SquidService {
  ...

  @aiFunction("This function creates a new item in a todo list", [
    {
      name: "title",
      description: "The title of the todo item",
      type: "string",
      required: true,
    },
    {
      name: "content",
      description: "The content of the todo item",
      type: "string",
      required: true,
    },
  ])
  async createTodoFromAssistant(params: {
    title: string;
    content: string;
  }): Promise<void> {
    const { title, content } = params;
    await this.createTodoInternal(title, content);
  }
}
```

Now let's call our function from inside `handleCreateWithAI` in `App.tsx`:

```tsx
const App = () => {
  ...

  const handleCreateWithAI = async (data) => {
    const { task } = data;
    await squid.executeFunction("createTodosWithAI", task);
  };

  ...
}
```
