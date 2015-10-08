using UnityEngine;
using System.Collections;
using System;
using System.Text;
using System.Net;
using System.IO;
using System.Net.Sockets;
using SimpleJSON;
public class CommunicationCotroler : MonoBehaviour {
	Socket server;
	CommunicationCotroler cc;
	GameObject recvMo;

	//data structure
	public Vector3 move{ get; set;}
	public Vector3 direction{ get; set;}
	public bool idle{ get; set;}//is the player idle?
	public bool shooting{ get; set;}//is the player shooting?
	public int health{ get; set;}
	public String player{ get; set;}
	public static String getSendingMsg;

	public string port;

	public bool connected = false;
	public GameObject menu;
	public MainMenu mm;

	public String player1;
	public String player2;
	public String player3;
	public int ReadyNumber=0;
	public void Awake(){
		DontDestroyOnLoad(transform.gameObject);
		try{
		menu = GameObject.Find ("MainMenu");
		mm = menu.GetComponent ("MainMenu") as MainMenu;
			player="player1";
		}
		catch(NullReferenceException e){
			Debug.Log(e);
				}
		}
	

	public string communicator(String ip, int port)
	{
		Security.PrefetchSocketPolicy (ip, port);

		IPEndPoint ipep = new IPEndPoint(
			IPAddress.Parse(ip), port);
		server = new Socket(AddressFamily.InterNetwork,
		                           SocketType.Stream, ProtocolType.Tcp);
		try
		{
			server.Connect(ipep);
		//	server.ReceiveTimeout=1500;
			connected=true;
		} 
		catch (SocketException e)
		{
			print("Unable to connect to server.");
			print(e.ToString());
			string error=e.ToString();
			return ("error:"+error.Substring(0,50)+"...");
		}
		//while (true) {
			//byte[] data = new byte[102400];
			//int recv = server.Receive (data);
			//String stringData = Encoding.ASCII.GetString (data, 0, recv);
		return "succeed";
	}
	public void Update()
	{
		if (connected) {
			OnReceive ();
			OnReceive();
			OnReceive();
		}
	}
	string lastRecv;
	byte[] data = new byte[150];
	int recv;
	String stringData;
	public void OnReceive(){

			recv = server.Receive (data);
			server.ReceiveTimeout = 60;
			stringData = Encoding.ASCII.GetString (data, 0, recv);
			if (stringData.Length > 10) {
				if (!stringData.Equals (lastRecv)) //ignore duplication
						getSendingMsg = stringData;
						}
			if (stringData.Contains ("Dplayer") && recv < 15)
				player = stringData;
			if (stringData.Contains ("ready") && !stringData.Contains ("type")) {
				try {
					ReadyNumber++;
				if(ReadyNumber>0){
					mm.allReceived ();
				}
					} catch (NullReferenceException e) {
					Debug.Log (e);
					}
			}
		if (stringData.Contains ("player1") && stringData.Contains ("type")) {
			player1=stringData;
			}
		if (stringData.Contains ("player2") && stringData.Contains ("type")) {
			player2=stringData;
		}
		if (stringData.Contains ("player3") && stringData.Contains ("type")) {
			player3=stringData;
			}
						lastRecv = stringData;
				}
	

	public void send(){
		sendTosocket ();
	}
	public void sendTosocket(){
		server.Send (Encoding.ASCII.GetBytes(getString()));
	}

	public void close()
	{
		server.Shutdown (SocketShutdown.Both);
		server.Close ();
		}



	public String getString()
	{
		String str="";
		if(player.Contains("1"))
		str = "{\"move\":[" + Convert.ToString (move.x) + "," +
			Convert.ToString (move.y) + "," + Convert.ToString (move.z) + "]," +
				"\"direction\":[" + Convert.ToString (direction.x) + "," +
				Convert.ToString (direction.y) + "," + Convert.ToString (direction.z) + "]," +
				"\"idle\":" + Convert.ToString (idle) + "," + "\"shooting\":" + Convert.ToString (shooting) + "," +
				"\"health\":" + Convert.ToString (health) + "," +
				"\"player\":\"player1\",\"type\":\"ingame\"}\n";
		if(player.Contains("2"))
			str = "{\"move\":[" + Convert.ToString (move.x) + "," +
				Convert.ToString (move.y) + "," + Convert.ToString (move.z) + "]," +
				"\"direction\":[" + Convert.ToString (direction.x) + "," +
				Convert.ToString (direction.y) + "," + Convert.ToString (direction.z) + "]," +
				"\"idle\":" + Convert.ToString (idle) + "," + "\"shooting\":" + Convert.ToString (shooting) + "," +
				"\"health\":" + Convert.ToString (health) + "," +
				"\"player\":\"player2\",\"type\":\"ingame\"}\n";
		if(player.Contains("3"))
			str = "{\"move\":[" + Convert.ToString (move.x) + "," +
				Convert.ToString (move.y) + "," + Convert.ToString (move.z) + "]," +
				"\"direction\":[" + Convert.ToString (direction.x) + "," +
				Convert.ToString (direction.y) + "," + Convert.ToString (direction.z) + "]," +
				"\"idle\":" + Convert.ToString (idle) + "," + "\"shooting\":" + Convert.ToString (shooting) + "," +
				"\"health\":" + Convert.ToString (health) + "," +
				"\"player\":\"player3\",\"type\":\"ingame\"}\n";
		return str;
	}
}



