# PostgreSQL CMS

A Content Management System built with Next.js, Prisma, and PostgreSQL.

## Table of Contents

- [Introduction](#introduction)
- [Technology Stack](#technology-stack)
- [Database Models and Relationships](#database-models-and-relationships)
  - [User](#user)
  - [Post](#post)
  - [Session](#session)
  - [Account](#account)
- [Setup](#setup)
- [Usage](#usage)
- [Contributing](#contributing)
- [License](#license)

## Introduction

PostgreSQL CMS is a robust content management system designed to help you create, manage, and publish content efficiently. Built with modern technologies like Next.js, Prisma, and PostgreSQL, it offers a seamless experience for both developers and content creators.

## Technology Stack

- **Frontend:** Next.js, React, Tailwind CSS
- **Backend:** Prisma ORM
- **Database:** PostgreSQL
- **Authentication:** Better Auth

## Database Models and Relationships

### User

Represents a user of the CMS.

- **id** (`String`): Unique identifier for the user.
- **email** (`String`, unique): User's email address.
- **password** (`String`): Hashed password for authentication.
- **sessions** (`Session[]`): One-to-many relationship with sessions.
- **accounts** (`Account[]`): One-to-many relationship with accounts (for OAuth).
- **posts** (`Post[]`): One-to-many relationship with posts authored by the user.
- **createdAt** (`DateTime`): Timestamp of when the user was created.
- **updatedAt** (`DateTime`): Timestamp of the last update to the user's information.

### Post

Represents a blog post or article.

- **id** (`String`): Unique identifier for the post.
- **title** (`String`): Title of the post.
- **slug** (`String`): URL-friendly version of the title.
- **excerpt** (`String`): Short summary of the post.
- **category** (`String`): Category under which the post falls.
- **tags** (`String[]`): Array of tags associated with the post.
- **coverImage** (`String`): URL of the cover image.
- **content** (`String`): Rich text content of the post.
- **authorId** (`String`): Foreign key referencing the `User` who authored the post.
- **author** (`User`): Many-to-one relationship with the `User`.
- **createdAt** (`DateTime`): Timestamp of when the post was created.
- **updatedAt** (`DateTime`): Timestamp of the last update to the post.

### Session

Represents a user session for authentication.

- **id** (`String`): Unique identifier for the session.
- **userId** (`String`): Foreign key referencing the `User` who owns the session.
- **user** (`User`): Many-to-one relationship with the `User`.
- **expiresAt** (`DateTime`): Expiration timestamp of the session.
- **createdAt** (`DateTime`): Timestamp of when the session was created.
- **updatedAt** (`DateTime`): Timestamp of the last update to the session.

### Account

Represents OAuth accounts linked to a user.

- **id** (`String`): Unique identifier for the account.
- **userId** (`String`): Foreign key referencing the `User` who owns the account.
- **user** (`User`): Many-to-one relationship with the `User`.
- **provider** (`String`): OAuth provider name (e.g., Google, GitHub).
- **providerAccountId** (`String`): Identifier provided by the OAuth provider.
- **accessToken** (`String?`): Access token from the OAuth provider.
- **refreshToken** (`String?`): Refresh token from the OAuth provider.
- **createdAt** (`DateTime`): Timestamp of when the account was linked.
- **updatedAt** (`DateTime`): Timestamp of the last update to the account.

## Setup

[Configuration documentation...]

## Usage

[Usage documentation...]

## Contributing

[Contribution documentation...]

## License

[Licence information...]
