# CASTR

## Group project #2   -- THE WIZARDS         
* Team Members: Luke Klymshyn, Will S, Krizel Minnema, Hyejin Kim
* Group Name: The Wizards
* Project Name: CASTR
* Repo: https://github.com/cshjnim/CASTR.git

Team Roles: 
Design: Luke
Auth/Chat/Conversation: Krizel
Auth/Aggregating/Database: Will
API: Hyejin

Technologies:
Web Sockets https://developer.mozilla.org/en-US/docs/Web/API/WebSockets_API
-Podcast API :: SimpleCast https://www.programmableweb.com/api/simplecast, MixCloud https://www.mixcloud.com/developers/ [[VoicePods, Digital Podcast Service]]
-[Audiobook API :: LibriVox] (??)
-CSS Framework :: Bulma
-ESLint, Travis
Okta - https://developer.okta.com/blog/2018/06/08/add-authentication-to-any-web-page-in-10-minutes
-Maybe Confetti for new users -- https://www.cssscript.com/confetti-falling-animation/

Overview: 
CASTR is a cross between Pinterest and Reddit/Quora.

Users sign up for an account and subscribe to their favorite podcasts. What makes this app different from native podcast platforms or aggregator is that they’re able to pin episodes on their dashboard and pull related conversations. (Future development: people can follow users.)

The real magic behind CASTR is the conversational space around the users’ favorite content. When a podcast is posted, users are able to have real, live conversations around the topic. Eventually, they’ll receive suggested podcasts relating to their engagement (future development) and likes.  

Competitors: 
Stitcher
Castbox
Soundcloud
Youtube (Kinda)
iTunes Podcasts

Simple Wireframe: 

LOGIN/SIGN UP
|
|_ VIEW PAGE
|	-Get podcasts on database (by Genre, Author, Poster, etc)
|	-Chat section on each page
|
|_ ADD PAGE
|	-Post Podcasts from RSS Feed, Youtube Channel
|	-Post single videos (must be a  link to youtube or Vimeo)
|
|_UPDATE POSTS
 -DELETE USER :: Doesn't delete posted casts or conversations
