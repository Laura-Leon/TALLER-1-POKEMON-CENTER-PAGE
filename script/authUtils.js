function userAuthChanged (loggedIn){
    const showloggedIn = document.querySelectorAll('.showLoggedIn');
    showloggedIn.forEach(function(elem){
        if(loggedIn){
            elem.classList.remove('hidden');
        }else{
            elem.classList.add('hidden');
        }
        
    });

    const hideloggedIn = document.querySelectorAll('.hideLoggedIn');
    hideloggedIn.forEach(function(elem){
        if(loggedIn){
            elem.classList.add('hidden');
        }else{
            elem.classList.remove('hidden');
        }
    
    });
    
    const showLoggedAdmin = document.querySelectorAll('.showLoggedAdmin');
   showLoggedAdmin.forEach(function (elem){

    if(loggesIn && loggedUser.admin){
        elem.classList.remove('hidden');

    }else{
        elem.classList.add('hidden');
    }
   })
}
