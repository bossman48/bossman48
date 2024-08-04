function selectChanged() {
    d = document.getElementById("pretrainedModel").value;
    if(d == 1){
        document.getElementById("modelInformation").innerText  = "Source: DisGeNet API, GDA Score >= 0.9";
    }
    else if(d == 2){
        document.getElementById("modelInformation").innerText  = "Source: DisGeNet API, GDA Score >= 0.5";
    }
    else if(d == 3){
        document.getElementById("modelInformation").innerText  = "Source: DisGeNet API, GDA Score >= 0.1";
    }
    else if(d == 4){
        document.getElementById("modelInformation").innerText  = "Source: DisGeNet API, GDA Score >= 0.05";
    }
    else if(d == 5){
        document.getElementById("modelInformation").innerText  = "Source: DisGeNet Curated";
    }
    else if(d == 6){
        document.getElementById("modelInformation").innerText  = "Source: ogbl-biokg(OGB)";
    }
    else{
        alert("Pre-trained model selection operation is failed");
    }
}


function sendRequest() {
    
    requrestUrl = "http://212.174.63.62:4848/encrypt";
    //requrestUrl = "http://127.0.0.1:4848/encrypt";
    document.getElementById("login").style.filter = "blur(2px)";
    document.getElementById("loading").style.visibility="visible";
    const data="";
    fetch(requrestUrl,{
        method: 'GET'
      })
    .then(response => response.json()) // the .json() method parses the JSON response into a JS object literal
    .then(data => {console.log(data);
    if( data.securitykey1 == null){
        
    }
    else if( data.securitykey2 == null){

    }
    else if( data.securitykey3 == null){

    }
    else{
        sendRequestAfterEncryption(data.securitykey1, data.securitykey2, data.securitykey3);
    }});

    
    
}



function sendRequestAfterEncryption(ciphertext, tag, nonce) {
    pretrainedModel = document.getElementById("pretrainedModel").value;
    geneID = document.getElementById("geneID").value;
    diseaseCUI = document.getElementById("diseaseCUI").value;
    
    url = "http://212.174.63.62:4848/"
    //url = "http://127.0.0.1:4848/"

    console.log(geneID+" "+diseaseCUI+" "+pretrainedModel+" "+ url);

    requrestUrl = url+"make-prediction?geneid="+geneID+"&diseaseid="+diseaseCUI+"&model="+pretrainedModel+"&securitykey1="+ciphertext+"&securitykey2="+tag+"&securitykey3="+nonce;

    
    const data="";
    fetch(requrestUrl)
    .then(res => res.json()) // the .json() method parses the JSON response into a JS object literal
    .then(data => {console.log(data);
    if( data.status == "1"){
        document.getElementById("predictionOutput").innerText = "Prediction Output : "+ data.output;
        document.getElementById("predictionOutput").style.visibility = "visible";
    }
    else{
        if(data.error != null){
            document.getElementById("predictionOutput").innerText = "Error: "+ data.error;
            document.getElementById("predictionOutput").style.visibility = "visible";
        }
        else if(data.output != null){
            document.getElementById("predictionOutput").innerText = "Failed: "+ data.output;
            document.getElementById("predictionOutput").style.visibility = "visible";
        }
    }

    document.getElementById("loading").style.visibility="hidden";
    document.getElementById("login").style.filter = "blur(0px)";
    });

    
    
}