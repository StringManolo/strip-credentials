# Strip-Credentials

### Short Description
Remove the credentials from your files before upload your projects to avoid leaking but also keeping including full source.

#### commands
| command | description |
| ------- | ----------- |
| npx stripc  | Read the files from "./sc.config". search the credentials after the comentaries and replace them by placeholders |
| npx stripc --init | Generate a void "./sc.config" file. Only usefull to create the file if you don't remember the file's name |
| npx stripc recover | Recover the original files from "./withCredentials" folder that mimics original file structure |
| npx stripc recover delete | Also removed the "./withCredentials" folder


### Download
```
npm install strip-credentials -g
```

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
npx stripc
```

4 - Open the files to make sure the credentials are removed.

5 - Add Commit and Push

6 - Recover the files to keep developing and remove withCredentials folder (you can omite delete function if you don't care about the folder being there)
```
npx stripc r d
```

