## Listes des services fonctionnels

# createUser
champ obligatoire : login, password, email, dateNaissance
route : /api/user

# deleteUser
route : /api/user/:userid
userid correspond à l'_id de la collection Users de l'utilisateur connecté

# getUser
route : /api/user/:userid
userid correspond à l'_id de la collection Users de l'utilisateur connecté

# getUserInfo
route : /api/user/infos

# login
champ obligatoire : login, password
route : /api/user/login
Je n'ai pas encore implémenté le login avec les cookies et les sessions, je compte le faire plus tard je vais donc adapter logout, et les services liés au Followers/Following

# logout
route : /api/user/:userid/logout
userid correspond à l'_id de la collection Users de l'utilisateur connecté


# addFollowing
route : /api/friend/:userid/following/:profilid
userid correspond à l'_id de la collection Users de l'utilisateur connecté
profilid correspond à l'_id de la collection Profil
userid choisi de suivre profilid

# deleteFollower
route : /api/friend/:userid/followers/:profilid
userid correspond à l'_id de la collection Users de l'utilisateur connecté
profilid correspond à l'_id de la collection Profil
Si profilid suit userid, on supprime profilid des followers de userid

# deleteFollowing
route : /api/friend/:userid/following/:profilid
userid correspond à l'_id de la collection Users de l'utilisateur connecté
profilid correspond à l'_id de la collection Profil
Si userid suit profilid, alors userid ne suivra plus profilid

# getListFollowers
route : /api/friend/:userid/followers 
userid correspond à l'_id de la collection Users de l'utilisateur connecté
Renvoie la liste des followers d'userid

# getListFollowing
route : /api/friend/:userid/following
userid correspond à l'_id de la collection Users de l'utilisateur connecté
Renvoie la liste des following d'userid



# Ajustement que je compte faire après avoir reussi à coder les sessions et les cookies

on aura plus besoin de préciser l'_id de l'utilisateur dans les routes, on pourra le recupérer dans req.cookie.user

deleteFollower DELETE /apifriends/user/followers/:profilid
si profilid est vide -> error
si profilid n'existe pas -> error
trouver myIndex dans le following de profilid
trouver profilIndex dans mon followers
si -1 -> error
supprimer le follower

addFollowing POST /apifriends/user/following/:profilid
si profilid est vide -> error
si profilid n'existe pas -> error
trouver myIndex dans le followers de profilid
trouver profilIndex dans mon following
si != -1 -> error
suivre profilid

deleteFollowing DELETE /apifriends/user/following/:profilid
si profilid est vide -> error
si profilid n'existe pas -> error
trouver myIndex dans dans le followers de profilid
trouver profilIndex dans mon following
si -1 -> error
ne plus suivre profilid

getListFollowers GET /apifriends/user/followers
je récupère mon profil
si dans l'url ce n'est ni followers ni following -> error
j'affiche mes Followers

getListFollowing GET /apifriends/user/following
je récupère mon profil
si dans l'url ce n'est ni followers ni following -> error
j'affiche mes Following

getUserFollowers GET /apifriends/user/:profilid/followers
si profilid est vide -> error
si profilid n'existe pas -> error
si dans l'url ce n'est ni followers ni following -> error
renvoyer les followers de profilid

getUserFollowing GET /apifriends/user/:profild/following
si profilid est vide -> error
si profilid n'existe pas -> error
si dans l'url ce n'est ni followers ni following -> error
renvoyer les following de profilid

getRelationship GET /apifriends/user/userid1/userid2/relationship (à voir)



## Services prévu

getUserFollowers
getUserFollowing
sendPrivateMessage
deletePrivateMessage
getListMessageWithProfil
tweet
deleteTweet
getListTweet
