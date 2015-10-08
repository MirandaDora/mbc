#pragma strict
private var originalRotate:Quaternion;
private var originalTransform:Vector3;
function Start () {
	originalRotate=transform.rotation;
	originalTransform=transform.position;
}

function Update () {
	//if(transform.rotation!=originalRotate) transform.rotation.z=originalRotate.z;
	//transform.position.y=originalTransform.y;
}