<img src="https://raw.githubusercontent.com/wsatchmo/Pixla/master/public/images/logo2_dark.png" data-canonical-src="https://raw.githubusercontent.com/wsatchmo/Pixla/master/public/images/logo2_dark.png" width="100%"/>

### Image and video-centric social media

##### Team members: [Hyejin Kim](https://github.com/cshjnim "Hyejin's Github"), [Krizel Minnema](https://github.com/krizel4 "Krizel's Github"), [Luke Klymshyn](https://github.com/UnseenMountain "Luke's Github"), [Will Satcher](https://github.com/wsatchmo "My Github")

```diff
! HOW IT WORKS !
```
Utilizes:
* Express
* Node
* SQL
* Okta Auth
* Express-Handlebars
* Bulma Framework

Users send & post image or link data to an SQL database which populates immediately on the home page using Handlebars. Each post creates its own page, which includes a comment section and like counter. Database is updated with new information from user comments and likes, which also populates immediately. Likes can be undone and comments can be edited and deleted. Front page displays all posts. Users can create accounts or login with Okta Auth (must login to comment); their like and comment data is saved to the database ~hosted on Heroku using JawsDB~

```diff
+ WHAT IT DOES +
```

•Create posts and watch them populate onto the main page from an SQL Database

•Mobile-responsive, aesthetically pleasing front page displays in reverse chronological order

•Users can post images from a specified URL or select from the Pexels API. A fruitless search gets a random picture

•Post message may contain an iframe embed from Youtube or other sources - it will automatically format

•Comment on posts to join the conversation. Comments by currently logged in users display with username

•Login via the Okta Oauth modal. New users must create an account and validate via email

•Users may log in or create posts anonymously - comments require login

•If a user types their password incorrectly, they are given the option of resetting their password via email


```diff
- ~DEPLOYMENT~ -
```

UPDATE: As Heroku has removed all free plans, this project is no longer deployed. I am currently working on finding it a home. It will likely be redeployed via [Google Firebase](https://firebase.google.com) in the future.

DEPLOYED SCREENSHOT: 

![Screenshots](/public/images/screenshots/frontpage.png)


```diff
# NOTES #
```
•If you use this app frequently, there is a possibility the API will hit its request quota. You can register for an API Key from [Pexels](https://www.pexels.com/api/) fairly easily. To use your own API Key, simply insert it in your code in the **pexels.js** file as follows:

```js
function makePexelsRequest (queryParamater, page){
    // Replace this long string with your own API Key ↓↓↓
    var APIKey = "563492ad6f917000010000016cb107822cca4692b05cb34dd239360d"; 
    ...}
```

•In the **main.js** file, be sure to input your own Okta config information (found in Okta project settings) first so there is no chance of conflicting authorization information. If you do not, your version likely will not work. The Okta config is as follows:

```js
//Replace this config object with your own Okta configuration ↓↓↓
var oktaSignIn = new OktaSignIn({
  baseUrl: your_base_url,
  clientId: your_client_id,
  authParams: {
    issuer: your_okta_server,
    responseType: ['token', 'id_token'],
    display: 'page'
  },
  features: {
      registration: true
  }
});
```

•Please also be wary of the SQL Database used; use your own by creating one with MySQL Workbench or your own SQL development environment. 
```html
<PLEASE DO NOT DROP OUR DATABASE!!!>
```
Input your own Database using the SQL Schema:

```sql
CREATE DATABASE your_db_name;
USE your_db_name;

CREATE TABLE posts (
    id INTEGER AUTO_INCREMENT,
    post_title varchar (100) NOT NULL,
    post_type varchar (50) NOT NULL,
    post_user varchar (100),
    post_body varchar (5000),
    post_image varchar (500) NOT NULL,
    -- post_likes INTEGER (50) NOT NULL DEFAULT 0,
    time_created DATETIME NOT NULL DEFAULT NOW(),
    PRIMARY KEY (id)
);

CREATE TABLE comments (
    id INTEGER AUTO_INCREMENT,
    postId INTEGER NOT NULL,
    name VARCHAR (44) NOT NULL,
    email VARCHAR (44) NOT NULL,
    comment VARCHAR (300) NOT NULL,
    time_created DATETIME NOT NULL DEFAULT NOW(),
    PRIMARY KEY(id),
    FOREIGN KEY(postId) REFERENCES posts(id)
);
```

##### Resources Utilized:
###### [OKTA](https://www.okta.com/)
###### [Bulma](https://bulma.io/)
###### [Handlebars.js](https://handlebarsjs.com/)
###### [Pexels Image API](https://www.pexels.com/api/)
###### [Heroku Deploy](https://heroku.com/)

<!-- 

TODO:

* Deleting & editing posts, comments

* Image upload from remote - possibly using Cloudinary

* Show date/time posted for posts & comments

* Post search, filter by genre

* Adding user profiles

-->

- - -

Created: Jan. 28, 2020
Last Updated: Jan. 17, 2024

```diff
# Happy coding! #
```
