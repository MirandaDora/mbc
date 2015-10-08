#pragma strict
//this guy receives msg and control the movement of player
//we need a few para to make the player move:
import SimpleJSON;
import CommunicationCotroler;
var mDirection:Vector3=Vector3.zero;
var rotateAngel:Vector3=Vector3.zero;
var isFire:boolean;
var isIdle:boolean;
var usingMsg:boolean;
var health:int;

//Firing control:
public var bulletSpwan:Transform;
public var bullet:GameObject;
var isFireing:boolean;
public var fireLight:Light;
public var fireSound:AudioSource;
public var cooldownTime:float;
public var mController:CharacterController;
public var Map:GameObject;
var comm:packageDeliver;

//animations
public var hit_ani:AnimationClip;
public var fire_ani:AnimationClip;
public var death_ani:AnimationClip;
public var walk_ani:AnimationClip;
public var idle_ani:AnimationClip;
public var ani:Animation;
public var motioncontrol:MotionController;

var strs:String;
var selfName:String;
var fireFinished:boolean=true;

function Start()
{
	Map=GameObject.Find("Initializer");
	Debug.Log(Map.name);
	comm=Map.GetComponent(packageDeliver);
	motioncontrol=GetComponent(MotionController);
	mController=GetComponent(CharacterController);
	usingMsg=true;
	selfName=gameObject.name;
	strs="";
}
function Update()
{
	if(selfName.Contains("1"))strs=comm.player1;
	if(selfName.Contains("2"))strs=comm.player2;
	if(selfName.Contains("3")){strs=comm.player3;}
	msgController();
	
}

public function msgController()
{ 
	
	Debug.Log(strs);
	if(usingMsg && strs.Length>0)
	{
		//parse JSON:
		var N=JSON.Parse(strs);

		var tempV3=N["move"];
		mDirection.x=N["move"][0].AsDouble;
		mDirection.y=N["move"][1].AsDouble;
		mDirection.z=N["move"][2].AsDouble;
		tempV3=N["direction"];
		rotateAngel.x=tempV3[0].AsFloat;
		rotateAngel.y=tempV3[1].AsFloat;
		rotateAngel.z=tempV3[2].AsFloat;
		health=N["health"].AsInt;
		isFire=N["shooting"].AsBool;
		isIdle=N["idle"].AsBool;
		turn();
		if(isFire)fire();
		if(isIdle)idle();
		if(!isIdle)walk();
		death();
		
		
	}

}
public function fire()
{
	if(health>0)
	{
		fireFinished=false;
  		ani.clip=fire_ani;
		ani.Play();
  		if(true){
  		Instantiate(bullet,bulletSpwan.transform.position, bulletSpwan.transform.rotation);
 	 	fireLight.enabled=true;
 	 	fireSound.Play();
 	 	motioncontrol.Fire();
 	 	fireLight.enabled=false;
 	 	fireFinished=true;
  	}
  	}
	else{
	 fireLight.enabled=false;
	 cooldownTime+=Time.deltaTime;
	}
	isFire=false;
}

public function walk()
{
	if(health>0)
	{
	mDirection=transform.TransformDirection(mDirection);
	mDirection=mDirection*6f;
 	mController.Move(mDirection*Time.deltaTime);
 	motioncontrol.Walk();
 	}
}

public function turn()
{
	var temp_trans:Quaternion=Quaternion.Euler(rotateAngel);

 	transform.rotation=Quaternion.Slerp(transform.rotation,temp_trans,Time.deltaTime*2);
}

public function jump()
{//might not usful
	
}

public function idle()
{
	if(health>0)
	{
		ani.clip=idle_ani;
		ani.Play();
	}
}

public function death()
{
	if(health<0)
	{
		ani.clip=death_ani;
		ani.Play();
	}
}