window.onload= function(){

  init();

  
  var UserInterface=null;
  var particles=1000;

  myThis =this;
  var camera, controls, scene, renderer;

  var interactables = [];
  var particleSystem;
  var rectangle = "/images/dot2.png";
  var imageData = "/images/block.png";
  var box = null;
  myThis.showabout= false;

  $("#showAbout").click(function(){
    myThis.showabout=!myThis.showabout;
    if(myThis.showabout){

        
        $("#aboutText").animate({'right':'0'},400, "swing", function() {
          $("#aboutText").show();
          $("#chatbox").hide();
          myThis.showabout= myThis.showabout;
          
        });
      }
    else{
        $("#aboutText").animate({'right':-window.innerWidth*0.4+'px'},200, "swing", function() {
            $("#aboutText").hide();
            $("#chatbox").hide();
            myThis.showabout= myThis.showabout;
            
        });
    }
  });


$("#closeAbout").click(function(){
    myThis.showabout=false;
    $("#aboutText").animate({'right':-window.innerWidth*0.4+'px'},200, "swing", function() {
            $("#aboutText").hide();
    });
});
  



    // visualize data button in starting page 
  $("#beginExplore").click(function(){
    console.log("skipping");
    $("#storyPrompt").hide();
    $("#storyPrompt").hide();
    $("#storybottom").hide();
    $("#UI").show();
    
  });
  


  // start the intro button in starting page
  $("#beginStory").click(function(){
    $("#storyPrompt").hide();
    $("#beginStory").hide();
    $("#skipStoryLine").show();
    $("#annotation").show();
    $("#nextlevel").show();
    $("#storybottom").show();
  });



// play intro button in side bar
  $("#storyline").click(function(){
    $("#UI").hide(); 
    $("#skipStoryLine").show();
    $("#annotation").show();
    $("#nextlevel").show();
    $("#storybottom").show();
  });




// quit button in subtitles
  $("#skipStoryLine").click(function(){
    $("#annotation").hide();
    $("#skipStoryLine").hide();
    $("#nextlevel").hide();
    $("#UI").show();
    console.log("skipping");
  
  });


function init(){



  // scene camera renderer

  var scene = new THREE.Scene();
  //background color to gray
  let camera = new THREE.PerspectiveCamera(60, innerWidth / innerHeight, 1, 1000);
  camera.position.set(71,17, 500);

  var renderer = new THREE.WebGLRenderer({antialias: true, alpha: true});
  renderer.setSize(innerWidth, innerHeight);
   //background color changer
  // renderer.setClearColorHex( 0xffffff, 1 );
  document.body.appendChild(renderer.domElement);


// ray caster for particle interaction like selecting and detecting collisons 
  var raycaster = new THREE.Raycaster();
  raycaster.params.Points.threshold = 1;
  var mouse = new THREE.Vector2();

  var arrayOfpath = [];



  // // lighting for scene 
  var light = new THREE.PointLight(0xffffff);
	light.position.set(0,0,50);
  light.visible= true;
  console.log(light);
	scene.add(light);


  let controls = new THREE.OrbitControls(camera, renderer.domElement);
  controls.enableRotate = true;
  controls.keys = {
                    LEFT: 'ArrowLeft', //left arrow
                    UP: 'ArrowUp', // up arrow
                    RIGHT: 'ArrowRight', // right arrow
                    BOTTOM: 'ArrowDown' // down arrow
                  };

  console.log(controls);

  controls.minDistance = 160;
  let sampler = null;
  let brain = null;
  new THREE.OBJLoader().load(
 "/brain-simple-mesh.obj",
  (obj) => {
    brain = obj.children[0];
    brain.material = new THREE.MeshBasicMaterial({
      wireframe: true,
      color: 6281, 
      blending: THREE.
      AdditiveBlending,
      transparent: false,
      opacity: 0.1
    });
    group.add(obj);
    sampler = new THREE.MeshSurfaceSampler(brain).build();
    group.scale.set(100,100,100);
    renderer.setAnimationLoop(render);
  },
  (xhr) => console.log((xhr.loaded / xhr.total) * 100 + "% loaded"),
  (err) => console.error(err)
);

// 8083348 purple
// 3089768 blue
// 4610734 blue 2
// 4409820 blue 3
// 4530924 blue 4 bright
// 9111286 purple 2 bright
// 6281 blue 3 bright
// 7883768 purple bright 3
// 9314489 purple bright 4
// 5644236 blue bright 3
// 5645027 blue+purple
// 1455703 light clear blue








  var switchStatus = false;
  $("#switch").on('change', function() {
      if ($(this).is(':checked')) {
          switchStatus = $(this).is(':checked');
        //  scene.background = new THREE.Color( 0x808080 );
        renderer.setClearAlpha(1.0);
       
          brain.traverse((node) => {
            if (node.isMesh) {
              node.material.opacity = 0.1;
              node.material.color =new THREE.Color( 0x301934 );
            }
            // scene.remove(light);
          });

          // alert(switchStatus);// To verify
      }
      else {
      switchStatus = $(this).is(':checked');
      renderer.setClearAlpha(0.0);

      // alert(switchStatus);// To verify
      // scene.background= new THREE.Color( 0x000000 );
      // renderer.setClearColor( 0x000000, 0);
      console.log("sucess"); 
      brain.traverse((node) => {
        if (node.isMesh) {
          node.material.opacity = 0.1;
          node.material.color =new THREE.Color( 6281 );
        }
      });

        
    }  });


    myThis = this;
    this.slideprofcad = false;
    this.chatslide = false;
    this.chatclose = false;

    $("#d").click(function() {
      if (!myThis.slideprofcad) {    
          $(".cont").animate({'right':'0'},400, "swing", function() {
            $(".cont").hide(); 
          });

          myThis.slideprofcad = true;

      } else {
          $(".cont").animate({'right':-window.innerWidth*0.4+'px'},200, "swing", function() {
            $(".cont").show();
          });
          myThis.slideprofcad = false;
          
      }
    });  


    // $("#chat").click(function() {
    //   myThis.chatslide = false;

    //   if (!myThis.chatslide) { 
    //       $("#chatbox").animate({'right':'0'},100, "swing", function() {
          
    //       $("#aboutText").hide(); 
    //       $("#chatbox").show();
    //       myThis.chatslide = true;

    //       });


    //   } else {
    //       $("#aboutText").animate({'right':'0'},100, "swing", function() {
    //         $("#chatbox").hide();  
    //         $("#aboutText").show();
    //         myThis.chatslide = false;

    //       });
    //   }
    // }); 

    // $("#chatclose").click(function() {
    //   myThis.chatclose = false;

    //   if (!myThis.chatclose) { 
    //       $("#chatbox").animate({'right':'0'},100, "swing", function() {
    //         $("#chatbox").hide();
    //         $("#aboutText").show(); 
    //       });
          
    //       myThis.chatclose = true;

    //   } else {
    //       $("#aboutText").animate({'right':'0'},200, "swing", function() {
    //         $("#aboutText").hide();
    //         $("#chatbox").show();
    //       });
    //       myThis.chatclose = false;
    //   }
    // }); 

    $("#chat").click(function(){
      $("#chatbox").show();
      $("#fname").focus();
      $("#aboutText").hide();
    })
    
    $("#chatclose").click(function(){
      $("#chatbox").hide();
      $("#aboutText").show();
    })



  let g = new THREE.BufferGeometry().setFromPoints(
    new Array(1000).fill().map((p) => {
      return new THREE.Vector3().random().subScalar(0.5).multiplyScalar(200);
    })
  );
  
  let uniforms = {
    time: {value: 0}
  }  


  var texture =  new THREE.TextureLoader().load("/images/dot8.png");
  let neuronmaterial = new THREE.PointsMaterial({
    color: 5645027 ,
    depthWrite: false,
    emissive: new THREE.Color(5645027),
    blending: THREE.AdditiveBlending,
    size: .8,
    map: texture,
    vertexColors: true,
  });


// UserInterface= new UI();

var group = new THREE.Group();
let p = new THREE.Points(g, neuronmaterial);


// var calar = new THREE.Color(0x8083348)
// console.log(calar);
// p.material.color.set(calar);
// p.colorsNeedUpdate = true;
// brain.material.color.set(calar);
// brain.colorsNeedUpdate = true;


scene.add(p);
/* Store each particle coordinates & color */
var vertices = [];


const tempPosition = new THREE.Vector3(); //coordinates of brain neurons / particles

 
function addPoint() {
  sampler.sample(tempPosition); //sampler gens 3d model from obj in json
  vertices.push(tempPosition.x, tempPosition.y, tempPosition.z); //, model vertices coordinates are stored in temp position
  g.setAttribute("position", new THREE.Float32BufferAttribute(vertices,3)  ); //g is buffergeometry for particles/neurons
  group.scale.set(0.4,0.4,0.4);
}

//array to store color
var colors = [];
for (var i = 0; i < g.attributes.position.count; i++) {
  colors.push(1, 1, 1); //random color values in rgb stored in color array
}
g.setAttribute('color', new THREE.BufferAttribute(new Float32Array(colors), 3)); //random colors given to buffer geom



var previewMat = new THREE.MeshBasicMaterial({
  color: 0xffffff,
  transparent: true,
  opacity: .6,
  blending: THREE.AdditiveBlending
});
var previewGeo = new THREE.CylinderGeometry(.1, .1, 1e3, 5, 1, true)


var sphereGeo = new THREE.SphereGeometry(.6, 32, 32);
var sphereMeshMat = new THREE.MeshBasicMaterial({
    color: 0xffffff,
    transparent: true,
    texture: new THREE.TextureLoader().load('/images/dot.png'),
    blending: THREE.AdditiveBlending,
    opacity: .5
});

var previewSphere = new THREE.Mesh(sphereGeo, sphereMeshMat );
// previewbeacon = new THREE.Object3D;
// previewbeacon.add(new THREE.Mesh(previewGeo,previewMat));

var rotgrp = new THREE.Group(); 
window.historyPath = [];
window.firebaseHistoryPath = [];



let arcpts = new THREE.Path().absarc(0, 0, 1.1, 0, Math.PI * 2).getPoints(90);
let cgeo = new THREE.BufferGeometry().setFromPoints(arcpts);
let cmat = new THREE.LineBasicMaterial( { color: 0xffffff, transparent: false, opacity: 0.5 } );
let circ = new THREE.Line(cgeo, cmat);


var lockedOn = new THREE.Object3D;
var circ2 = circ.clone();
var circ1 = circ.clone();
circ2.rotation.x =  Math.PI / 2;
circ1.rotation.y =  Math.PI / 2;
lockedOn.add(circ1);
lockedOn.add(circ2);



var geometryf = new THREE.BufferGeometry();

geometryf.setFromPoints( historyPath );
geometryf.setAttribute("position", new THREE.Float32BufferAttribute(historyPath,3)  );
var materialf = new THREE.LineBasicMaterial( { color: 0xffffff, linewidth: 4 } );
var lines = new THREE.Line( geometryf, materialf );



function onMouseDown( e) {
  e.preventDefault();
  mouse.x = (e.clientX / renderer.domElement.width) * 2 - 1;
  mouse.y = -(e.clientY / renderer.domElement.height) * 2 + 1;
  raycaster.setFromCamera(mouse, camera);


  var intersects = raycaster.intersectObject(p, true);
  // console.log(intersects);
  if (intersects.length > 0) {
    var particle = intersects[0];
    g.attributes.color.setXYZ(particle.index,  particle.point.x, particle.point.y, particle.point.z);
    g.attributes.color.needsUpdate = true; 
    particle.object.parent.children[0].visible = true;
    neuronmaterial.vertexColors = true;





    // var calar = new THREE.Color(0x8e8e8e).setHex(Math.random() * 0x8e8e8e)
    // console.log(calar);
    // particle.object.material.color.set(calar);
    // g.colorsNeedUpdate = true;

    
    
   
    historyPathVec = new THREE.Vector3();
    
    g.attributes.position.setXYZ(particle.index, 0,0,30 );
    controls.object.rotateOnAxis( particle.point.y, Math.PI * -0.5);
    camera.updateProjectionMatrix();
    lockedOn.position.set(particle.point.x, particle.point.y, particle.point.z);

    // firebaseHistoryPath.push(particle.point.x, particle.point.y, particle.point.z);
    historyPathVec.set(particle.point.x, particle.point.y,particle.point.z);
			 var todayDate = document.querySelector('rect.day.today').textContent;
			 console.log(todayDate);
       historyPath.push(historyPathVec);

      //  var path = arrayOfpath.map((historyPathVec)});
       var histref =	db.collection("user").doc(firebase.auth().currentUser.uid).collection('history');
  //   console.log(historyPathVec);  
  //   console.log(path);
  //   var setWithMerge = histref.set({
  //     histvec :historyPathVec
  // }, { merge: true });
 db.collection("user").doc(firebase.auth().currentUser.uid).collection('history').doc(todayDate.toString()).set({histvec:  firebase.firestore.FieldValue.arrayUnion({x:historyPathVec.x,y:historyPathVec.y,z:historyPathVec.z})},{merge:true})
        .then(() => {
          console.log("Document added with ID: ");
        })
        .catch((error) => {
          console.error("Error adding document: ", error);
        });

        db.collection("user").doc(firebase.auth().currentUser.uid).collection('history').doc(todayDate).update({
          histvec : {x: historyPathVec.x,
          y: historyPathVec.y,
        z:historyPathVec.z} })
        .then(() => {
          console.log("field written with ID: ");
        })
        .catch((error) => {
          console.error("Error adding document: ", error);
        });

      

    rotgrp.add(previewSphere);
    rotgrp.add(p);
    rotgrp.add(lockedOn);
    rotgrp.add(brain);
    rotgrp.add(lines);



    scene.add( rotgrp ); 


    var o =0;
    window.reverseHistpath = historyPath.reverse();

 
  

    $("#contrastbutton").click(function(){

      if (o> historyPath.length){

        console.log(previewSphere.position);

        gsap.to( camera.position, {
          x: reverseHistpath[o].x,
          y: reverseHistpath[o].y,
          z: reverseHistpath[o].z,
          onUpdate: function() {
            camera.updateProjectionMatrix(); 
            particle.object.material.color.set(calar);
            g.colorsNeedUpdate = true;
            previewSphere.position.set(reverseHistpath[o].x,reverseHistpath[o].y,reverseHistpath[o].z);
            lockedOn.position.set(reverseHistpath[o].x,reverseHistpath[o].y,reverseHistpath[o].z);
        
            brain.material.color.set(calar);
            brain.colorsNeedUpdate = true;
          }
        }); 

        o+=1
        console.log("rev",reverseHistpath[o]);
        console.log(o);
      }
      else{

        gsap.to( camera.position, {
        duration: 1,
        x: historyPath[o].x,
        y: historyPath[o].y,
        z: historyPath[o].z,
        onUpdate: function() {
          camera.updateProjectionMatrix(); 
          // lockedOn.attributes.position.setXYZ(o, historyPathVec[o].x,historyPathVec[o].y,historyPathVec[o].z);
          lockedOn.position.set( o, historyPath[o].x,historyPath[o].y,historyPath[o].z);
          previewSphere.position.set(o, historyPath[o].x,historyPath[o].y,historyPath[o].z);

        }
      });
    
      o+=1
    console.log(historyPath[o]);
    console.log(o);
      }  
    }
     
     );

    //cinematic sty;e animation for particle selection onclick (min distance specified above in controller params)
    gsap.to( camera.position, {
      duration: 1,
      x: particle.point.x,
      y: particle.point.y,
      z: particle.point.z,
      onUpdate: function() {
        camera.lookAt(particle.point.x,particle.point.y,particle.point.z);
        camera.updateProjectionMatrix();
       
      }
    } );



  }

}


function render(a) {
  
  group.rotation.z += 0;
  p.rotation.y +=0; 
  circ2.rotation.x +=  0.005* Math.PI / 2;
  circ1.rotation.y += 0.005*  Math.PI / 2;


  $("#beginExplore").click(function(){
    p.scale.set(10,10,10);
    brain.scale.set(10,10,10);
    // scene.remove(group);
    scene.add(brain);
    if (vertices.length < 1000) {
      for(var i = 0; i < particles; i++){
        addPoint();}    
    }
  });


  $("#skipStoryLine").click(function(){
    console.log("updateMatrixWorld");
    if (vertices.length < 1000) {
      for(var i = 0; i < particles; i++){
        addPoint();}    
    }
  });


  $("#beginStory").click(function(){
    p.scale.set(40,40,40);
    zoomInTimeline(0, 4, 300, 0);
    rotateAroundGroup = true;
    if (vertices.length < 1000) {
      for(var i = 0; i < particles; i++){
        addPoint();}    
    }
     });


     $("#showlabels").click(function(){
      scene.remove(brain);
      scene.add(lines);  
       });


       $("#enableZoom").click(function(){
       controls.minDistance=50;
       controls.update();

//        db.collection('user').get().then((snapshot) => {
//    		 console.log('test');
// 		var y =  snapshot.docs[0]._delegate._document.data.value.mapValue.fields;
// 		console.log(y.Username.stringValue);
// 		console.log(y.coins.integerValue);
// 		console.log(y.historyPath.arrayValue.values[0].doubleValue);
// 		console.log(y);
// });
         });



   
       
     $(".sectionTitle").click(function(){
    
        group.remove(p);
        scene.remove(p);
        group.scale.set(.01,.01,.01);
          
                 
     $(".modeSelector").click(function(){
    
      scene.remove(x);
      scene.add(p);
       });

       });


  controls.update();
  renderer.render(scene, camera);
}

const zoomInTimeline = (x, y, z, zoomOutFactor = 0) => {
	let tl = gsap
		.timeline({ defaults: { duration: 3, ease: "expo.in" } })
		.to(controls.target, { x, y, z })
		.to(camera.position, { x, y, z: z + zoomOutFactor }, 0)
		.to(group.rotation, { x: 0, y: 0 }, 0);
};


window.addEventListener( 'mousedown', onMouseDown, false );

window.addEventListener("resize", onWindowResize, false);
document.body.addEventListener('keydown', keyPressed, false);



function keyPressed(e){
  switch(e.key) {
  	case 'ArrowUp':
    	rotgrp.rotateZ(-0.1);
    	break;
    case 'ArrowDown':
    	rotgrp.rotateZ(0.1);
    	break;
    case 'ArrowLeft':
    	rotgrp.rotateY(0.1);
    	break;
    case 'ArrowRight':
    	rotgrp.rotateY(-0.1);
    	break;render
  }
  // e.preventDefault();
  // render();
  
  controls.update();
  // renderer.render(scene, camera);
}


// function keyDown(e) {

//   // keyboard[e.keyCode] = true;
//   console.log("LEFT");
//   rotateleft();
// }

// function keyUp(e) {

//   // keyboard[e.keyCode] = false;
//   console.log("right");
//   rotateleft();

// }

// window.addEventListener('keydown', keyDown);
// window.addEventListener('keyup', keyUp);

let clock = new THREE.Clock();
renderer.setAnimationLoop((_) => {
  let t = clock.getElapsedTime();
  uniforms.time.value = t;
  renderer.render(scene, camera);
});

function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
}

const animate = function(){
  requestAnimationFrame( animate );
  onMouseDown();

}


}


}

