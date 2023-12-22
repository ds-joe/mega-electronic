# Mega Electronic

A React Laravel e-commerce dashboard to manage your sales, order, expenses, etc...

**Frameworks and features:**

- Using Diagram to create database structure in `public/docs/database-structure.drawio`.
- Using Interia for `SSR` Server Side Rendering.
- Using React for `front-end`.
- Using Laravel for `backend` .
- TypeScript support for type safety.
- Spatie for roles and permissions [Visit documentation](https://spatie.be/docs/laravel-permission/v5/introduction)
- Sass support for CSS pre-processing
- Tailwind CSS support for utility-first CSS
- Vitest support for valid ui to avoid any bugs

**To use the template, simply clone the repository and run the following commands:**

```shell
composer install
npm install
npm start
php artisan serve
```

**Additional commands:**

```shell
# run backend server
npm run backend:start

# setup backend database & default data
npm run backend:setup

# refresh backend database & default data
npm run backend:refresh

# test react pages using typescript.
npm run test:ts

# test react pages & components with vitest
npm run test
npm run test:coverage

# build front end files.
npm run build
```
