# Strip-Credentials

### Short Description
Remove the credentials from your files before upload your projects to avoid leaking but also keeping including full source.

#### commands
| command | description |
| ------- | ----------- |
| stripc  | Read the files from "./sc.config". search the credentials after the comentaries and replace them by placeholders |
| stripc --init | Generate a void "./sc.config" file. Only usefull to create the file if you don't remember the file's name |
| stripc recover | Recover the original files from "./withCredentials" folder that mimics original file structure |
| stripc recover delete | Also removed the "./withCredentials" folder


### How to use
1 - Add a commentary just right before the credentials as shown
```
const myPrivateEmail = /* REPLACE EMAIL BETWEEN ''*/'manolo@example.com',

const database = {
  mySecretPassword: /* REPLACE PASSWORD BETWEEN ""*/"mypass",
}
```

2 - List your file inside "./sc.config"
```
connectToDatabase.js
cpp/server.cpp

```

3 - Run the command
```
stripc
```

4 - Open the files to make sure the credentials are removed.

5 - Add Commit and Push and Recover the files running
```
stripc r d
```

