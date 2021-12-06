# Typed React Router

Typed route paths & typed route parameters on top of React Router V6, providing better editor support and increased safety.

- [x] **Out of the box**
- [x] **Automatically infer route params**
- [x] **Better editor support**
- [x] **Increased type safety**

![Example of typed link](./react-router-link.gif)

## Principles
`typed-react-router` uses a combination of typescipt's conditional types & template literal types to infer the route patterns of your app on compile time.
The main aim of `typed-react-router` is to be:
- Type-safe
- Explicit
- Refactorable
- React Router V6 compatible

It discourages links to relative paths and allows the editor to provide auto-completion of absolute paths. This has the advantages of:
- You directly see where a link will be navigating to
- You get auto-completions on all route patterns
- Modifying the (parent) routes will result in compile errors
- Correct route parameters are enforced by the type system

> During route declaration, you may use both absolute & relative route paths. When you want to navigate to a route, absolute paths need to be used.

## Install

`npm install typed-react-router`

`yarn add typed-react-router`



## Getting started

`typed-react-router` works with any project that uses React Router V6 and is built upon its [route objects api](https://reactrouter.com/docs/en/v6/examples/route-objects)

1. You need to define your routes as Route Objects
2. Make a `const` assertion of your routes so that no literal types will be widened (e.g. no going from `"/courses"` to `string`). This will enable the typescript compiler to infer the route patterns

```typescript
export const routes = [
  {
    path: '/',
    element: <Layout />,
    children: [
      { index: true, element: <Home /> },
      {
        path: 'courses',
        element: <Courses />,
        children: [
          { index: true, element: <CoursesIndex /> },
          {
            path: 'details/:courseId',
            element: <Course />,
            children: [
              {
                path: 'students',
                element: <Students />,
                children: [
                  { index: true, element: <StudentsIndex /> },
                  { path: ':studentId', element: <Student /> },
                ],
              },
            ],
          },
        ],
      },
      { path: '*', element: <NoMatch /> },
    ],
  },
] as const // <-- Make sure to use 'as const' instead of a type name
```

3. Construct a typed router

```typescript
export const TypedRouter = constructTypedRouter(routes)
```

4. Use the routes and make sure that the router context is available

For example:

```typescript
<BrowserRouter>
  <App />
</BrowserRouter>
```

```typescript
export function Layout() {
  return (
    <div>
      <nav>
        <ul>
          <li>
            <TypedRouter.Link to="/">Home</TypedRouter.Link>
          </li>
          <li>
            <TypedRouter.Link to="/courses">Courses</TypedRouter.Link>
          </li>
          <li>
            <TypedRouter.Link
              to="/courses/details/:courseId"
              params={{ courseId: 'nothing' }}
            >
              Nothing Here
            </TypedRouter.Link>
          </li>
        </ul>
      </nav>

      <hr />

      <Outlet />
    </div>
  )
}
```

## FAQ


### What if I want to use relative paths in my route objects?
This library supports both relative and absolute paths in your routes declarations (the ones that you pass to `useRoutes`, same as in `react-router`.

### What if I want to make relative links?
Like explained in the `Principles` section above, `typed-react-router` is meant to be used by pointing to absolute route paths.

This means that the following code (taken from the `Route objects` react-router example):
```typescript
  const routes: RouteObject[] = [
    {
      path: "/",
      element: <Layout />,
      children: [
        { index: true, element: <Home /> },
        {
          path: "/courses",
          element: <Courses />,
          children: [
            { index: true, element: <CoursesIndex /> },
            { path: "/courses/details/:courseId", element: <Course /> }
          ]
        },
        { path: "*", element: <NoMatch /> }
      ]
    }
  ];


...
// omitted for brevity
...

function CoursesIndex() {
  return (
    <div>
      <p>Please choose a course:</p>

      <nav>
        <ul>
          <li>
            <Link to="react-fundamentals">
              React Fundamentals
          </Link>
          </li>
          <li>
            <Link to="advanced-react">
              Advanced React
            </Link>
          </li>
          <li>
            <Link to="react-router">
              React Router
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
}

```

will become:

```typescript
const { Link } from TypedRouter;

export function CoursesIndex() {
  return (
    <div>
      <p>Please choose a course:</p>

      <nav>
        <ul>
          <li>
            <Link
              to="/courses/details/:courseId"
              params={{ courseId: "react-fundamentals" }}
            >
              React Fundamentals
            </Link>
          </li>
          <li>
            <Link
              to="/courses/details/:courseId"
              params={{ courseId: "advanced-react" }}
            >
              Advanced React
            </Link>
          </li>
          <li>
            <Link
              to="/courses/details/:courseId"
              params={{ courseId: "react-router" }}
            >
              React Router
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
}
```
You can always still use `react-router` directly as you might seem fit.
