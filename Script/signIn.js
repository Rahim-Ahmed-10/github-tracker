
document.getElementById("signIn-btn").addEventListener("click", function(){ 
    // 1:Get the Username input -->
    const usernameInput = document.getElementById("input-username");
    const userName = usernameInput.value;
    console.log(userName);
    
    //2:Get the Password input -->
    const passwordInput = document.getElementById("input-password");
    const password = passwordInput.value;
    console.log(password);

    // 3:Match password & Username

    if(userName == 'admin'  && password == 'admin123'){
         // 3-1 true:::>> alert>homepage
        alert('login Success');
        // window.location.replace('/home.html')
        window.location.assign('./home.html');
    }else{
           //3-1 false:::>> alert > return
    alert('login Failed');
    return; 
    }
})