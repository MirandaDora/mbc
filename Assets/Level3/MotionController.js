#pragma strict
	public var walk:AnimationClip;
	public var stand_Lshot:AnimationClip;
	public var seat_Lshot:AnimationClip;
	public var stand_Fshot:AnimationClip;
	public var idle:AnimationClip;
	public var death:AnimationClip;
	public var run:AnimationClip;
	public var hit:AnimationClip;
	
	//setup the health property
	var startingHealth:int=100;
	var currentHealth:int;
	var scoreValue:int=10;
	
	private var hitParticles:ParticleSystem;
	private var capsuleCollider:CapsuleCollider;
	private var isDead:boolean;
	
	public var healthManager:GameObject;

	public var playermove;
public var aniBody:Animation;
function Start()
{
	hitParticles=GetComponentInChildren(ParticleSystem);
	capsuleCollider=GetComponent(CapsuleCollider);
	//start health is full
	currentHealth=startingHealth;
	aniBody.clip=idle;
	aniBody.Play();
}

public function TakeDamage(amount:int,hitPoint:Vector3)
{
	if(isDead) return;
	aniBody.CrossFade(hit.name,0.23f);
	currentHealth-=amount;
	
	hitParticles.transform.position=hitPoint;
	
	hitParticles.Play();
	
	if(currentHealth<=0)Death();
	
}

public function Death()
{
	isDead=true;
	aniBody.clip=death;
	aniBody.Play();
	GetComponent(playerMove).disableMove();
	GameOver();
	
}

function Update () {

}
public function Walk(){
	aniBody.CrossFade(walk.name);
	
}
public function Idle(){
	aniBody.CrossFade(idle.name,1f);
}

public function Fire(){
	if(!isDead){
	 aniBody.CrossFade(stand_Fshot.name);
	}
	else 
		GameOver();
}

function GameOver(){
	Application.ExternalCall("GameOver",this.gameObject.name);
	Debug.Log("gameover");
}
