# This project has global configuration.

In `./config` directory you can find various parameters that are used across all apps within this 
monorepo - api, platform and landing.

For example, in [auth.config.ts](../config/auth.config.ts) you can configure validation rules for
class-validator, where generic ```public validate()``` method is called. Implementation example can be seen here
[SignInWithEmailCredentials.dto.ts:14](../dtos/src/auth/SignInWithEmailCredentials.dto.ts)
