#pragma strict
import CommunicationCotroler;
public var player:GameObject;
public var playerHealth:GameObject;
public var mSpeed=6f;
public var mAngles=0f;
var isJumping;
public var gravity=20f;
public var mController:CharacterController;
private var collisionFlags;
private var verticalSpeed=0f;
public var playerGravity=20f;
public var moveDirection:Vector3=Vector3.zero;
public var mDirection:Vector3=Vector3.zero;
public var Map:GameObject;
var jump=10;
var isWorking:boolean;
var hAngles:float;
var cameras:Camera;
var isIdle:boolean=false;
var isFire:boolean=false;

var last_mAngles:float;
var last_hAngles:float;
var last_move:Vector3=Vector3.zero;
//let the thing run or stand
public var motioncontrol:MotionController;

//control fire
public var bulletSpwan:Transform;
public var bullet:GameObject;
var isFireing:boolean;
public var fireLight:Light;
public var fireSound:AudioSource;

public var cooldownTime:float;

//animations:
public var hit_ani:AnimationClip;
public var fire_ani:AnimationClip;
public var death_ani:AnimationClip;
public var walk_ani:AnimationClip;
public var idle_ani:AnimationClip;
public var ani:Animation;

function Start () {
	mController=GetComponent(CharacterController);
	isWorking=true;
	motioncontrol=GetComponent(MotionController);
	isFireing=false;
	Map=GameObject.Find("Communicator");
	MovementController();
}

function Update () {
	//moveDirection=Vector3.zero;
	if(isWorking){
	MovementController();
	}
}

 
 public function forwardBack(s:String)
 {

 	var v=parseFloat(s);
 	//moveDirection.x=0;
 	if(v<-5){
 	//SetPersonDirection(PersonDirection.Forward);
 	moveDirection.z=1;
 	//player.transform.Translate(Vector3.forward*Time.deltaTime*mSpeed);
 	}
 	else if(v>5){
 	//SetPersonDirection(PersonDirection.Backward);
 	moveDirection.z=-1;
 	//player.transform.Translate(Vector3.back*Time.deltaTime*mSpeed);
 	}
 	else moveDirection.z=0;
 }
 public function leftRight(s:String)
 {
 	var l=parseFloat(s);
 	//moveDirection.z=0;
 	if(l>5){
 	//SetPersonDirection(PersonDirection.Right);
 	moveDirection.x=1;
 	//player.transform.Translate(Vector3.right*Time.deltaTime*mSpeed);
 	}
 	else if(l<-5){
 	//SetPersonDirection(PersonDirection.Left);
 	moveDirection.x=-1;
 	//player.transform.Translate(Vector3.left*Time.deltaTime*mSpeed);
 	}
 	else moveDirection.x=0;
 	Application.ExternalCall("Callback",l);
 	
 }
 
 public function udRotate(s:String)
 {
 	hAngles=parseFloat(s);
 	var canrotate:boolean=true;

 	if(hAngles>5)hAngles=5;
 	else if(hAngles<-5)hAngles=-5;
 }
 public function lrRotate(s:String)
 {
 	var canrotate:boolean=true;
 	var temp_angle:float=parseFloat(s);
 	var temp_angle_abs:float=Mathf.Abs(temp_angle);
 	var last_angle_abs:float=Mathf.Abs(last_mAngles);
 	if(temp_angle_abs-last_angle_abs<1)canrotate=false;
 	if(Mathf.Abs(last_angle_abs-temp_angle_abs)>1)canrotate=false;
 	if(temp_angle_abs>25)
 	{
 		if(temp_angle<-25)
 			mAngles-=5;
 		else mAngles+=5;	
 	}
 }
 public function jumps(s:String)
 {
 	if(s=="true")isJumping=true;
 }
 
 public function fire(s:String)
 {
 	if(s=="true"){
 	isFireing=true;}
 }
 
 public function MovementController(){

  mDirection=Vector3.zero;
  isIdle=false;
  isFire=false;

  
  	if(Input.GetKey(KeyCode.A))
	{
		leftRight("-25");
	}
	else if(Input.GetKey(KeyCode.D))
	{
		leftRight("25");
	}
	else leftRight("0");
	if(Input.GetKey(KeyCode.W))
	{
		forwardBack("-25");
	}
	else if(Input.GetKey(KeyCode.S))
	{
		forwardBack("25");
		//player.transform.Translate(Vector3.back*Time.deltaTime*mSpeed);
	}
	else {forwardBack("0");}
	if(Input.GetKey(KeyCode.Space))
	{
		jumps("true");
	}
	if(Input.GetAxis("Fire1")){fire("true");isFire=true;}
	else isJumping=false;
	
	//put into socket:
	mAngles+=Input.GetAxis("Mouse X");
	var s=mAngles.ToString();
	//lrRotate(s);
	hAngles+=Input.GetAxis("Mouse Y");
	s=hAngles.ToString();
	hAngles=limithAngle(hAngles);
	var ccer:GameObject=GameObject.Find("Communicator");
	var comm:CommunicationCotroler=Map.GetComponent(CommunicationCotroler);
	//move to:
	//jump
	if(isJumping){
	//ApplyGravity();
	moveDirection.y=jump;
	isJumping=false;
	}
	moveDirection.y-=playerGravity*Time.deltaTime*30;
	comm.move=moveDirection;
	//rotation:
	comm.direction=new Vector3(0,mAngles*2,0);
	if(moveDirection.x==0 && moveDirection.z==0)
	comm.idle=true;
	else comm.idle=false;
	comm.shooting=isFire;
	
	
	//get health:
	var he:HealthManagement=playerHealth.GetComponent(HealthManagement);
	comm.health=he.currentHealth;
	comm.send();
	
	last_move=moveDirection;


	last_mAngles=mAngles;
	last_hAngles=hAngles;
	
	//isJumping=false;

 }
 function limitmAngle(f:float)
 {
 	var limitation=25;
 	if(f>limitation)f=limitation;
 	else if(f<(limitation*-1))f=limitation*(-1);
 	return f;
 }
 
 function limithAngle(f:float)
 {
 	var limitation=8;
 	if(f>limitation)f=limitation;
 	else if(f<(limitation*-1))f=limitation*(-1);
 	return f;
 }
  
 
 function CollisionDetect()
 {
 	if(collisionFlags && CollisionFlags.Sides)Debug.Log("trues");
 }

 
function IsGrounded()
{
    return mController.isGrounded;
}
 
function IsJumping()
{
    return isJumping;
}

function disableMove()
{
	isWorking=false;
}

function enableMove()
{
	isWorking=true;
}