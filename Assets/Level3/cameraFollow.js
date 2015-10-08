#pragma strict
public var camera_height=2.5f;
public var camera_distance=2.5f;

public var player:Transform;
public var camerad:Transform;

function Start () {
	//camerad=Camera.main.transform;
}

function Update () {
	 camerad.eulerAngles =new Vector3(camerad.eulerAngles.x,
		                               player.eulerAngles.y,
		                               camerad.eulerAngles.z);
		//获取当前的镜头的Y轴旋转度
		var angle = camerad.eulerAngles.y;

		//计算x轴的距离差:
		var deltaX = camera_distance * Mathf.Sin(angle * Mathf.PI /180 );
		var deltaZ = camera_distance * Mathf.Cos (angle * Mathf.PI / 180);



		//每一帧都改变摄像机的高度
		camerad.position = new Vector3 (player.position.x-deltaX,
			                              player.position.y+ camera_height,
			                              player.position.z-deltaZ);
}