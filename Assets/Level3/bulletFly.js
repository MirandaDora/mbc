#pragma strict
var bulletSpeed=5;
var healthmanager1:GameObject;
var healthmanager2:GameObject;
var healthmanager3:GameObject;

var hittedWho:GameObject;
var healthManager:GameObject;
function Start () {
	healthmanager1=GameObject.Find("Health1");
	healthmanager2=GameObject.Find("Health2");
	healthmanager3=GameObject.Find("Health3");
}

function Update () {
	transform.Translate(Vector3.forward*Time.deltaTime*bulletSpeed);
}

function OnCollisionEnter(collision : Collision)
{
	var hitName:String=collision.gameObject.name;
	if(hitName.Contains("Player"))
	{
		hittedWho=collision.gameObject;
		var who:Transform=hittedWho.transform;
		healthManager=who.Find("Health").gameObject;
		healthManager.GetComponent(HealthManagement).Hurt(10);
	}
	Destroy(this.gameObject);
}