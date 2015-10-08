#pragma strict
public var hit:AnimationClip;
public var death:AnimationClip;
public var hit_sound:AudioClip;
public var death_sound:AudioClip;


function Update () {

}

function OnTriggerExit(other : Collider)
{
	if(other.gameObject.name=="bullet")
    {
    	Destroy(other.gameObject);
    	
    }
}