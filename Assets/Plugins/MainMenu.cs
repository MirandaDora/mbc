using UnityEngine;
using System.Collections;
[ExecuteInEditMode]
public class MainMenu : MonoBehaviour {
	bool confirm;
	string port="6259";
	string ip="127.0.0.1";
	public GameObject communicator;
	public CommunicationCotroler comm;
	public GUIText state;
	void Start(){
		GameObject st = GameObject.Find ("state");
		state=st.GetComponent("GUIText") as GUIText;
		communicator=GameObject.Find("Communicator");
		comm = communicator.GetComponent ("CommunicationCotroler") as CommunicationCotroler;
	}
	void OnGUI()
	{
		ip = GUI.TextField (new Rect (250,80,200,20), ip, 25);
		port = GUI.TextField (new Rect (300, 130, 100, 20), port, 40);

		bool confirm = GUI.Button (new Rect (320, 180, 60, 20), "connect");
		if (confirm) {
			string temp=state.text;
			string isSucc=comm.communicator(ip,int.Parse(port));
			Debug.Log(isSucc);
			if(isSucc.Contains("error"))
			{
				state.text=temp+"\n"+isSucc;

			}
			else state.text=temp+"\n game connected\n Waiting...";
		}

	}

	public void allReceived()
	{
		string temp=state.text;
		state.text =  temp + "\n All players connected\n Loading Game...";
		Application.LoadLevel ("The Palace of Orinthalian");
	}
	// Use this for initialization

}
