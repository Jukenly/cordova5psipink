let app = {
  init: function () {
    document.addEventListener("deviceready", app.ready);
  },
  ready: function () {
    app.addListeners();
  },
  addListeners: function () {
    document.querySelector("#add-notif").addEventListener("click", app.addNote);
    cordova.plugins.notification.local.on("click", function (notification) {
        alert("notification");
    });
    cordova.plugins.notification.local.on("trigger", function (notification) {
        alert("Shapos adalah aplikasi yang digunakan untuk memposting lowongan kerja, berita promo dan membahassemua tentang freelance");
    });
  },
  addNote: function (ev) {
    let props = cordova.plugins.notification.local.getDefaults();
    let id = new Date().getMilliseconds();
    let notifTime = new Date();

 

    //set current time + 5 seconds
    notifTime.setSeconds(notifTime.getSeconds() + 1);

 

    let noteOptions = {
      id: id,
      title: "Semangat",
      text: "Jangan putus asa masa depan anda akan lebih indah ",
      at: notifTime
    };

 

    cordova.plugins.notification.local.schedule(noteOptions, function(note){
      //
    });
    console.log("Add notification id " + id);
  }
};
app.init();


function loadPostingList(){
  var url = "http://api.aklani.my.id/5PSI20/shaposmarketing/list.php";
  $.getJSON(url, function (result) {
      console.log(result);
      $.each(result, function (i, field) {
          var id = field.id;
          var image = field.image;
          var deskripsi = field.text;
          var hastag = field.hastag;
          var name = field.name;
          var time = field.time;
       

          var list =  "<div class='card'>"+
                      "<div class='picture'>"+
                          "<img src='http://api.aklani.my.id/5PSI20/shaposmarketing/" + image + "'/>"+
                      "</div>"+
                      "<div class='dropdown'>"+
                        "<button onclick='myFunction(\"myDropdown"+id+"\")' class='dropbtn'><i class='fas fa-ellipsis-h'></i></button>"+
                        "<div id='myDropdown"+id+"' class='dropdown-content'>"+
                        "<a href='#' data-toggle='modal' data-target='#Modalupdate' onclick='updatefunc(\""+id+"\", \""+deskripsi+"\", \""+hastag+"\")'>Update</a>"+
                        "<a href='#' onclick='deletePost(\""+id+"\")'>Delete</a>"+
                        "</div>"+
                        "<div class='content'>"+
                          "<div class='header'>"+
                              "<div class='profile-pic'></div>"+
                              "<div class='detail'>"+
                                "<p class='name'>" + name + "</p>"+
                                "<p class='posted'>" + time.substring(0, 16) + "</p>"+
                              "</div>"+
                          "</div>"+
                          "<div class='desc'>" + deskripsi  + "</div>"+
                          "<div class='tags'>"+
                              "<span>" + hastag + "</span>"+
                          "</div>"+
                          "<div class='footer'>"+
                              "<div class='like'>"+
                                "<i class='fas fa-heart'></i>"+
                                "<span>12k</span>"+
                              "</div>"+
                              "<div class='comment'>"+
                                "<i class='fas fa-comment'></i>"+
                                "<span>12k</span>"+
                              "</div>"+
                          "</div>"+
                        "</div>"+
                      "</div>"+
                      "</div>";
      $("#postinglist").append(list);
    });
});
};

$("#formadd").on('submit',(function(e) {
    e.preventDefault();
      var fd = new FormData(this);
      fd.append( 'insert', 'insert' );
      $.ajax({
          type: "POST",
          url: "http://api.aklani.my.id/5PSI20/shaposmarketing/insert.php",
          data: fd,
          crossDomain: true,
          cache: false,
          processData: false,
          contentType: false,
          success: function (data) {
              var result = data.toString().trim();
              if (result === "success") {
                
                //$('#modalAddPost').close();
                  loadPostingList();
                 
                  alert("Add Success"); 
              } else {
                  alert("Add Failed");
              }
          }
      });
  }));
  

  $("#loginform").on('submit',(function(e) {
    e.preventDefault();
      var fd = new FormData(this);
      fd.append( 'login', 'login' );
      $.ajax({
          type: "POST",
          url: "http://api.aklani.my.id/5PSI20/shaposmarketing/login.php",
          data: fd,
          crossDomain: true,
          cache: false,
          processData: false,
          contentType: false,
          success: function (data) {
              var result = data.toString().trim();
              var myObj = JSON.parse(result);
              var s = false;
              $.each(myObj, function (i, field) {
                  var id = field.id;
                  var user = field.user;
                  window.localStorage["id"] = id;
                  window.localStorage["user"] = user;
                  s = true;
                  
              });

              if(s){
                location.replace("index.html");
                alert('login sukses !');
              }else{
                alert('login Gagal !');
              }
          }
      });
  }));

<!-- untuk Update -->
$("#formupdate").on('submit',(function(e) {
  e.preventDefault();
    var fd = new FormData(this);
    fd.append( 'update', 'update' );
    $.ajax({
        type: "POST",
        url: "http://api.aklani.my.id/5PSI20/shaposmarketing/update.php",
        data: fd,
        crossDomain: true,
        cache: false,
        processData: false,
        contentType: false,
        success: function (data) {
            var result = data.toString().trim();
            if (result === "success") {
              loadPostingList();
                alert("Update Product Success");
            } else {
                alert("Update Product Failed");
            }
        }
    });
}));

<!-- untuk Delete -->
function deletePost(id){
  console.log("id "+id);
  $.ajax({
      type: "GET",
      url: "http://api.aklani.my.id/5PSI20/shaposmarketing/delete.php?id="+id,
      data: '',
      crossDomain: true,
      cache: false,
      processData: false,
      contentType: false,
      success: function (data) {
          var result = data.toString().trim();
          if (result === "success") {
              alert("Delete Product Success");
          } else {
              alert("Delete Product Failed");
          }
      }
  });
};







