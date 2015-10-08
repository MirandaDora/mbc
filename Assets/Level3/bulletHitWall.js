#pragma strict

function OnTriggerExit(other : Collider)
{
    /*Debug.Log(other.gameObject.name);
    if(other.gameObject.name=="bullet(Clone)")Destroy(other.gameObject);
    else 
    {
    	var person=other.gameObject;
    	person.GetComponent(FPSInputController).hitWall();
    }*/
}

function OnTriggerEnter (other : Collider) {
	if(other.gameObject.name=="bullet(Clone)" || other.gameObject.name=="bullet" )Destroy(other.gameObject);
	//else
    else 
    {
    	
    	var person=other.gameObject;
    	//person.GetComponent(FPSInputController).hitWall();
    }
	}
	
function OnCollisionEnter (other : Collision) {
		if(other.gameObject.name=="bullet(Clone)" || other.gameObject.name=="bullet" )Destroy(other.gameObject);
    else 
    {
    	var person=other.gameObject;
    	//person.GetComponent(FPSInputController).hitWall();
    }
	}