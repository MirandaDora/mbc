public var currentHealth=100f;
private var totalHealth=100f;
var healthBar:Transform;
var healthValue:TextMesh;
public var player:GameObject;

private var motioncontrol;
function Start () {
	currentHealth=totalHealth;
	motioncontrol=player.GetComponent(MotionController);
}

public function Hurt(blood:int)
{//if someone was hurt ,the blood will down
	
	currentHealth-=10f;
    if(currentHealth<=2)
    {
    currentHealth=1;
    Debug.Log("over");
    }
    var healthBarlength:float;
    if(currentHealth<=2)healthValue.text="Die";
    healthBarlength=currentHealth/totalHealth;
	healthBar.transform.localScale.x=healthBarlength;
	healthValue.text=currentHealth+"/100";
}