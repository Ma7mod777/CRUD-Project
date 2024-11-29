var bookmarkList = [];
var siteNameInput = document.getElementById("SiteName");
var siteURLInput = document.getElementById("sitUrl");

if (localStorage.getItem("bookmarks") != null){

  bookmarkList= JSON.parse(localStorage.getItem("bookmarks"))
  display();
  

}

function bookmarksite(){



  if (validatesitename ()==true && validatesiteURL ()==true ){

    var onebookmark = {

      siteName : siteNameInput.value ,
      siteURL : siteURLInput.value ,
      }
      
      for (var test of bookmarkList){
if (siteNameInput.value ==test.siteName ){

  Swal.fire({
    title: "Sorry !",
    text: "Repeated Website Name .",
    icon: "question"
  });

  clear ();
  siteNameInput.classList.remove("is-valid");
  siteNameInput.classList.remove("is-invalid");
  siteURLInput.classList.remove("is-valid");
  siteURLInput.classList.remove("is-invalid");

  return


}
      }
      bookmarkList.push(onebookmark);
      localStorage.setItem("bookmarks", JSON.stringify(bookmarkList));
      
      display ();
      
      clear ();
      siteNameInput.classList.remove("is-valid");
      siteNameInput.classList.remove("is-invalid");
      siteURLInput.classList.remove("is-valid");
      siteURLInput.classList.remove("is-invalid");
      
  }

  else {

    Swal.fire({
      icon: "error",
      title: "Site Name or Url is not valid, Please follow the rules below :",
      text: ` Site name must contain at least 3 characters 
              & Site URL must be a valid one `,
      footer: '<a href="#">Why do I have this issue?</a>'
    });

    clear ();

    siteNameInput.classList.remove("is-valid");
    siteNameInput.classList.remove("is-invalid");
    siteURLInput.classList.remove("is-valid");
    siteURLInput.classList.remove("is-invalid");

}



}


function display (){
var cartona = "";

  for (var i=0 ; i<bookmarkList.length ; i++){

cartona += `
    <tr class="fs-6 border-bottom">
        <td class="w-25 py-2">${i+1}</td>
        <td class="w-25 py-2">${bookmarkList[i].siteName}</td>
        <td class="w-25 py-2 "><a target="_blank" href="${bookmarkList[i].siteURL}"><button class="border-0 btn-visit rounded-2 py-2 px-4"><i class="fa-solid fa-eye text-white"></i><span class="text-white">  Visit</span></button></a></td>
        <td class="w-25 py-2"><button class="border-0 btn-delete rounded-2 py-2 px-4" onclick="deletefun(${i})" ><i class="fa-solid fa-trash-can text-white"></i> <span class="text-white">Delete</span></button></td>
    </tr>

`

  }
  document.getElementById("my-table").innerHTML = cartona;

}

function clear () {
  siteNameInput.value = "";
  siteURLInput.value = "";
}


function deletefun(index){


  Swal.fire({
    title: "Are you sure?",
    text: "You won't be able to revert this!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Yes, delete it!"
  }).then((result) => {
    if (result.isConfirmed) {
     
      bookmarkList.splice(index,1);
      localStorage.setItem("bookmarks", JSON.stringify(bookmarkList));
    
    display ();
     
      Swal.fire({
        title: "Deleted!",
        text: "Your file has been deleted.",
        icon: "success"
      });
    }
  });




}

function validatesitename (){


var siteNamevalue =  siteNameInput.value ;
var regexName = /\w{3,15}\s?\w{0,10}\s?\w{0,10}$/gm ;

if (regexName.test(siteNamevalue) ){
  siteNameInput.classList.add("is-valid");
  siteNameInput.classList.remove("is-invalid")

return true
}
else{

  siteNameInput.classList.remove("is-valid");
  siteNameInput.classList.add("is-invalid")

  return false
}

}


function validatesiteURL (){


  var siteURLvalue =  siteURLInput.value ;
  var regexURL = /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/gmi ;
  
  if (regexURL.test(siteURLvalue) ){
    siteURLInput.classList.add("is-valid");
    siteURLInput.classList.remove("is-invalid")
  
  return true
  }
  else{
  
    siteURLInput.classList.remove("is-valid");
    siteURLInput.classList.add("is-invalid")
  
    return false
  }
  
  }