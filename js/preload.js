const tokenLoader = sessionStorage.getItem('token')
if(tokenLoader == null){
    window.open('login.html', '_self');
}