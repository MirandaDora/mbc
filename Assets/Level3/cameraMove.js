#pragma strict
var speed:float=3f;
private var movement:Vector3;
private var anim:Animator;
private var playerRigidbody:Rigidbody;
private var camRayLength:float=100f;
private var initialRotation:Vector3;
private var initialPosition:Vector3;
private var rotate:Vector3;

function Start()
{
		playerRigidbody=GetComponent(Rigidbody);
	//initialRotation=transform.rotation;
	initialPosition=transform.position;
}

function Update () {
	var h:float=Input.GetAxisRaw("Horizontal");
	var v:float=Input.GetAxisRaw("Vertical");
	
	Move(h,v);
	if(h!=0)Rotate(h);
}

function Move(h:float,v:float)
{

	var step = speed * Time.deltaTime;
	movement.Set(h,0f,v);	
		// Move our position a step closer to the target.
	transform.position = Vector3.MoveTowards(transform.position, transform.position+movement, step);
}

function Rotate(h:float)
{
	var smooth=2.0;
	var tiltAngle=60.0;
	var target=Quaternion.Euler(0,h*tiltAngle,0);
	playerRigidbody.rotation=Quaternion.Slerp(transform.rotation,target,Time.deltaTime*smooth);
}