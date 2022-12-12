# **spotify-karaoke**
 simple karaoke webapp with spotify API

 ## Preview:
 ![Spotify Karaoke web preview](/media/spotify-karaoke-preview.gif)
 
 ### Demo: [Live on Vercel](https://spotify-karaoke-web-player.vercel.app/)


### 🚧 **Tech stack**
1. React JS
2. Express JS
3. Tailwind
4. Spotify API
   
 ---

## **🛠 Usage**
**Clone the repo 👥**

```$ git clone https://github.com/metkerr/spotify-karaoke.git```

**Create .env file inside server directory**

```
$ cd server
$ .>.env 
```

**Insert this on .env file:**

>REDIRECT_URI=http://localhost:3000 \
CLIENT_ID=**Your CLIENT ID goes here** \
CLIENT_SECRET=**Your CLEINT SECRET goes here** \
*You can get your own client id and secret from [Spotify Dev Dashboard](https://developer.spotify.com/dashboard)*

**Install the dependencies for both server & client and then run the system**

🏭 Server:

```
$ cd server

$ npm install

$ npm run dev 
```

🌐 Client:

```
$ cd client

$ npm install

$ npm start
```

Now the system should be running and you can visit the client on http://localhost:3000





