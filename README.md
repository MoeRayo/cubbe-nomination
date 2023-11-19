# Cube Academy

## Getting Started

### Repository

[Cube Academy](https://github.com/MoeRayo/cube-nomination)

Please follow the steps below to run this application in your local environment.

Before you begin, please install [Node.js](https://nodejs.org/en/) (LTS version recommended) on your machine.

### Clone the repository

```bash
git clone https://github.com/MoeRayo/cubbe-nomination.git
```

or

Download the ZIP

### Navigate to project directory

```
cd cube-nomination
```

### Install dependencies

```bash
npm install
```

### Start server

```bash
npm run dev
```

This will start the development server which can be viewed by navigating to http://localhost:8080

## Challenge and Solution

First time usage of [OpenApi Codegen](https://github.com/fabien0102/openapi-codegen) and [TanStack Query](https://tanstack.com/query/latest).

_While the documentation was well written and helped me understand what I needed to do, this article by the [Xata team](https://xata.io/blog/openapi-typesafe-react-query-hooks) was also very enlighteneing and helped smoothen the learning curve as regards understanding the why and the how._

## Extra Technologies

In addition to the recommended technologies, I also used the follwoing extra tools:

- [React modal](https://www.npmjs.com/package/react-modal)
- [React Hot Toast](https://react-hot-toast.com/docs)
- [React Responsive](https://www.npmjs.com/package/react-responsive)
- [Font Awesome](https://fontawesome.com/)

## Extra Features I added

1.  **Signup and Signin forms**: While this was not a mandatory requirement. I added it based on the follwing reasons:
    - Adding this made authenticating the API faster.
    - Privacy. Other users should not be able to see whom you have nominated and what your reasons for the nominations were.
2.  The design did not expressly include what the user should see when there are no closed or current nominations. I modified the general "No nominations" component to show the user the same copy of the component but different texts.

## More features

- **States**: A lot more focus on state change across the application would make user experience friendlier
- **Test**: Adding texts would have defintitely been a great addition

## Compromises

- **Sticky button** : Sticky buttons were a requirement in the design. However, I just couldn't get it to work as it ought to, and decided to leave it most of them as normal flowing buttons.

- **Nomination count**: I tried to implement a feature with the nominations to prevent users from seeing the nomination count until they login. This involved updating the header when the state changes; however, I ran into a snag that was taking too lomng to fix. As a result I settled with rerouting the users, as opposed to just hiding the element from the UI.
