# Typed React Router

Typed route paths & typed route parameters on top of React Router V6, providing better editor support and increased safety.

- [x] **Out of the box**
- [x] **Automatically infer parameters**
- [x] **Increased editor support**
- [x] **Increased type safety**

## Getting started

`typed-react-router` works with any project that uses React Router V6 and is built upon it's [route objects api](https://reactrouter.com/docs/en/v6/examples/route-objects)

1. You need to define your routes as Route Objects
2. Make a `const` assertion of your routes so that no literal types will be widened (e.g. no going from "/courses" to string) and enabling the typescript compiler to infer the route patterns

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
