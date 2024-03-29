	var _mybankAPIgateway = angular.module('_mybankAPIgateway', []); 

	_mybankAPIgateway.controller('_mybankAPIgatewayController', function ($scope, $http) {
	
	$scope.customer = {};
	$scope.account = {};
	$scope.moneytransfer = {};
	$scope.account.eventlog = {};
	$scope.customer.eventlog={};
	//$scope.moneytransfer.eventlog={};
	
	$scope.showeventlog = 0; //bydefault hide the event log

	$scope.data = {
	
						query:"SELECT CONCAT( " + 
								" '[', " + 
							" GROUP_CONCAT(JSON_OBJECT(%fields%)), " +
								"']'" + 
								") as jsonresult from %TABLE_NAME%;" 
								 ,
						querytype:0,
						queryresponse:"",
						eventquery:"SELECT CONCAT( " + 
								" '[', " + 
							" GROUP_CONCAT(JSON_OBJECT('eventsource',eventsource,'eventdestination',eventdestination,'eventstatus',eventstatus,'eventdirection',eventdirection,'eventdata',eventdata,'createdate',createdate) order by createdate desc), " +
								"']'" + 
								") as jsonresult from tEvents ;" 
								 
						};
						
	$scope.data.querytemplate = {
									"create": "INSERT INTO %TABLE_NAME% (%fields%) VALUES (%values%);", 
									"delete":"DELETE FROM %TABLE_NAME% WHERE _ID in ( %ID_LIST% );",
									"update":"UPDATE %TABLE_NAME% SET %fields% WHERE _id = %_ID%;",
									"read":"SELECT CONCAT( '[', GROUP_CONCAT(JSON_OBJECT(%fields%)),']') as jsonresult from  %TABLE_NAME% ;"
								};
	
	$scope.data.customer = {
								"tablename":"tCustomer",
								"insertfields":"customername,customeraddress,customerphone,customertype",
								"selectfields":"'_ID',_ID,'customername',customername,'customeraddress',customeraddress,'customerphone',customerphone,'customertype',customertype"
							};
	
	$scope.data.account = {
								"tablename":"tAccount",
								"insertfields":"accountname,accountbalance",
								"selectfields":"'_ID',_ID,'accountname',accountname,'accountbalance',accountbalance"
							};
				
	$scope.data.moneytransfer = {
								"tablename":"tMoneyTransfer",
								"insertfields":"from_account,to_account,amount",
								"selectfields":"'_ID',_ID,'from_account',from_account,'to_account',to_account,'amount',amount"
							};
							
		$scope.customer.executequery = function () 
		{
			//alert("execute query called");
			
			$http({
						method: 'POST',
						url: 'http://localhost:8081/mybank/customer/executequery/',
						dataType: 'json',
						data: {query: $scope.data.query,
								querytype: $scope.data.querytype},
						headers: { 'Content-Type': 'application/json; charset=UTF-8' }
					}).then(function successCallback(response) {
							// this callback will be called asynchronously
							// when the response is available
							$scope.msg = "Post Data Submitted Successfully!";
							$scope.data.queryresponse = response.data;
							//alert(response.data);
							
						  }, function errorCallback(response) {
							$scope.msg = "Service not Exists." + response.data;
							$scope.statusval = response.status;
							$scope.statustext = response.statusText;
							$scope.headers = response.headers();
							
							
						  });
			
		}; //executequery function
		
		$scope.account.executequery = function () 
		{
			//alert("execute query called");
			
			$http({
						method: 'POST',
						url: 'http://localhost:8082/mybank/account/executequery/',
						dataType: 'json',
						data: {query: $scope.data.query,
								querytype: $scope.data.querytype},
						headers: { 'Content-Type': 'application/json; charset=UTF-8' }
					}).then(function successCallback(response) {
							// this callback will be called asynchronously
							// when the response is available
							$scope.msg = "Post Data Submitted Successfully!";
							$scope.data.queryresponse = response.data;
							//alert(response.data);
							
						  }, function errorCallback(response) {
							$scope.msg = "Service not Exists." + response.data;
							$scope.statusval = response.status;
							$scope.statustext = response.statusText;
							$scope.headers = response.headers();
							
							
						  });
			
		}; //executequery function
		
		
		$scope.anna.insertquery = function () 
		{
			//alert("execute query called");
			
			$http({
						method: 'POST',
						url: 'http://localhost:8083/savecustomer?name=a&email=ab@gmail&phone=2345&feedback=thank',
						dataType: 'json',
						data: {query: $scope.data.query,
								querytype: $scope.data.querytype},
						headers: { 'Content-Type': 'application/json; charset=UTF-8' }
					}).then(function successCallback(response) {
							// this callback will be called asynchronously
							// when the response is available
							$scope.msg = "Post Data Submitted Successfully!";
							$scope.data.queryresponse = response.data;
							//alert(response.data);
							
						  }, function errorCallback(response) {
							$scope.msg = "Service not Exists." + response.data;
							$scope.statusval = response.status;
							$scope.statustext = response.statusText;
							$scope.headers = response.headers();
							
							
						  });
			
		}; //insertquery function
		
		
		
		$scope.moneytransfer.executequery = function () 
		{
			//alert("execute query called");
			
			$http({
						method: 'POST',
						url: 'http://localhost:8083/mybank/moneytransfer/executequery/',
						dataType: 'json',
						data: {query: $scope.data.query,
								querytype: $scope.data.querytype},
						headers: { 'Content-Type': 'application/json; charset=UTF-8' }
					}).then(function successCallback(response) {
							// this callback will be called asynchronously
							// when the response is available
							$scope.msg = "Post Data Submitted Successfully!";
							$scope.data.queryresponse = response.data;
							//alert(response.data);
							
						  }, function errorCallback(response) {
							$scope.msg = "Service not Exists." + response.data;
							$scope.statusval = response.status;
							$scope.statustext = response.statusText;
							$scope.headers = response.headers();
							
							
						  });
			
		}; //executequery function
		
		$scope.data.customer.insertquery = function () 
		{
			var fieldvalues = "";
			$scope.data.query = $scope.data.querytemplate.create;
			$scope.data.querytype = 1;
			
			$scope.data.query  = $scope.data.query.replace(/%TABLE_NAME%/, $scope.data.customer.tablename);
			
			$scope.data.query  = $scope.data.query.replace(/%fields%/, $scope.data.customer.insertfields);
			
			fieldvalues = "'" + $scope.form.customer.name + "'" + ",'unknown','unknown','0'";
			
			$scope.data.query  = $scope.data.query.replace(/%values%/, fieldvalues);
			
			$scope.customer.executequery(); 
			
			
		}; //insertquery function
		
		$scope.data.customer.deletequery = function () 
		{
			
			$scope.data.query = $scope.data.querytemplate.delete;
			$scope.data.querytype = 1;
			
			$scope.data.query  = $scope.data.query.replace(/%TABLE_NAME%/, $scope.data.customer.tablename);
			
			$scope.data.query  = $scope.data.query.replace(/%ID_LIST%/, $scope.form.customer._ID);
			
			$scope.customer.executequery(); 
			
			
		}; //deletequery function
		
		$scope.data.customer.updatequery = function () 
		{
			
			
			$scope.data.query = $scope.data.querytemplate.update;
			$scope.data.querytype = 1;
			
			$scope.data.customer.updatefields = " customername = " + "'" + $scope.form.customer.name + "'"; 
			
			$scope.data.query  = $scope.data.query.replace(/%TABLE_NAME%/, $scope.data.customer.tablename);
			
			$scope.data.query  = $scope.data.query.replace(/%fields%/, $scope.data.customer.updatefields);
			
			$scope.data.query  = $scope.data.query.replace(/%_ID%/, $scope.form.customer._ID);
			
			$scope.customer.executequery(); 
			
		}; //updatequery function
		
		$scope.data.customer.selectquery = function () 
		{
			
			//alert("select query called");
			
			$scope.data.query = $scope.data.querytemplate.read;
			
			$scope.data.querytype = 0;
			
			$scope.data.query  = $scope.data.query.replace(/%TABLE_NAME%/, $scope.data.customer.tablename);
			
			$scope.data.query  = $scope.data.query.replace(/%fields%/, $scope.data.customer.selectfields);
			
			$scope.customer.executequery(); 
						
		}; //selectquery function
		
		$scope.data.customer.vieweventlog = function()
		{
			alert($scope.data.eventquery);
			$scope.showeventlog = 1; 
			
			$http({
						method: 'POST',
						url: 'http://localhost:8081/mybank/customer/executequery/',
						dataType: 'json',
						data: {query: $scope.data.eventquery,
								querytype: 0},
						headers: { 'Content-Type': 'application/json; charset=UTF-8' }
					}).then(function successCallback(response) {
							// this callback will be called asynchronously
							// when the response is available
							$scope.msg = "Post Data Submitted Successfully!";
							$scope.customer.eventlog = response.data;
							alert(response.data);
							
						  }, function errorCallback(response) {
							$scope.msg = "Service not Exists." + response.data;
							$scope.statusval = response.status;
							$scope.statustext = response.statusText;
							$scope.headers = response.headers();
						  });
						  
		}//account event log
		
		$scope.hideeventlog = function()
		{
			$scope.showeventlog = 0;
		}


$scope.data.account.insertquery = function () 
		{
			var fieldvalues = "";
			$scope.data.query = $scope.data.querytemplate.create;
			$scope.data.querytype = 1;
			
			$scope.data.query  = $scope.data.query.replace(/%TABLE_NAME%/, $scope.data.account.tablename);
			
			$scope.data.query  = $scope.data.query.replace(/%fields%/, $scope.data.account.insertfields);
			
			fieldvalues = "'" + $scope.form.account.name + "'" + ",'50000'";
			
			$scope.data.query  = $scope.data.query.replace(/%values%/, fieldvalues);
			
			$scope.account.executequery(); 
			
			
		}; //insertquery function
		
		$scope.data.account.deletequery = function () 
		{
			
			$scope.data.query = $scope.data.querytemplate.delete;
			$scope.data.querytype = 1;
			
			$scope.data.query  = $scope.data.query.replace(/%TABLE_NAME%/, $scope.data.account.tablename);
			
			$scope.data.query  = $scope.data.query.replace(/%ID_LIST%/, $scope.form.account._ID);
			
			$scope.account.executequery(); 
			
			
		}; //deletequery function
		
		$scope.data.account.updatequery = function () 
		{
			
			
			$scope.data.query = $scope.data.querytemplate.update;
			$scope.data.querytype = 1;
			
			$scope.data.account.updatefields = " accountname = " + "'" + $scope.form.account.name + "'"; 
			
			$scope.data.query  = $scope.data.query.replace(/%TABLE_NAME%/, $scope.data.account.tablename);
			
			$scope.data.query  = $scope.data.query.replace(/%fields%/, $scope.data.account.updatefields);
			
			$scope.data.query  = $scope.data.query.replace(/%_ID%/, $scope.form.account._ID);
			
			$scope.account.executequery(); 
			
		}; //updatequery function
		
		$scope.data.account.selectquery = function () 
		{
			
			//alert("select query called");
			
			$scope.data.query = $scope.data.querytemplate.read;
			
			$scope.data.querytype = 0;
			
			$scope.data.query  = $scope.data.query.replace(/%TABLE_NAME%/, $scope.data.account.tablename);
			
			$scope.data.query  = $scope.data.query.replace(/%fields%/, $scope.data.account.selectfields);
			
			$scope.account.executequery(); 
						
		}; //selectquery function
		
		$scope.data.account.vieweventlog = function()
		{
			alert($scope.data.eventquery);
			$scope.showeventlog = 1; 
			
			$http({
						method: 'POST',
						url: 'http://localhost:8082/mybank/account/executequery/',
						dataType: 'json',
						data: {query: $scope.data.eventquery,
								querytype: 0},
						headers: { 'Content-Type': 'application/json; charset=UTF-8' }
					}).then(function successCallback(response) {
							// this callback will be called asynchronously
							// when the response is available
							$scope.msg = "Post Data Submitted Successfully!";
							$scope.account.eventlog = response.data;
							alert(response.data);
							
						  }, function errorCallback(response) {
							$scope.msg = "Service not Exists." + response.data;
							$scope.statusval = response.status;
							$scope.statustext = response.statusText;
							$scope.headers = response.headers();
						  });
						  
		}//account event log
		
		$scope.hideeventlog = function()
		{
			$scope.showeventlog = 0;
		}
		
		$scope.data.moneytransfer.insertquery = function () 
		{
			var fieldvalues = "";
			$scope.data.query = $scope.data.querytemplate.create;
			$scope.data.querytype = 1;
			$scope.data.query  = $scope.data.query.replace(/%TABLE_NAME%/, $scope.data.moneytransfer.tablename);
			$scope.data.query  = $scope.data.query.replace(/%fields%/, $scope.data.moneytransfer.insertfields);
			fieldvalues = "'" + $scope.form.moneytransfer.from_account + "','" + $scope.form.moneytransfer.to_account + "','" + $scope.form.moneytransfer.amount + "'";
			$scope.data.query  = $scope.data.query.replace(/%values%/, fieldvalues);
			$scope.moneytransfer.executequery(); 
		}; //insertquery function
		

		$scope.data.moneytransfer.deletequery = function () 
		{
			
			$scope.data.query = $scope.data.querytemplate.delete;
			$scope.data.querytype = 1;
			$scope.data.query  = $scope.data.query.replace(/%TABLE_NAME%/, $scope.data.moneytransfer.tablename);
			$scope.data.query  = $scope.data.query.replace(/%ID_LIST%/, $scope.form.moneytransfer._ID);
			$scope.moneytransfer.executequery(); 
			
			
		}; //deletequery function
		
		$scope.data.moneytransfer.updatequery = function () 
		{
			
			
			$scope.data.query = $scope.data.querytemplate.update;
			$scope.data.querytype = 1;
			
			$scope.data.moneytransfer.updatefields = " From_Account = " + "'" + $scope.form.moneytransfer.from_account + "'";
			$scope.data.moneytransfer.updatefields = " To_Account = " + "'" + $scope.form.moneytransfer.to_account + "'";			
			$scope.data.moneytransfer.updatefields = " Amount = " + "'" + $scope.form.moneytransfer.amount + "'";
			$scope.data.query  = $scope.data.query.replace(/%TABLE_NAME%/, $scope.data.moneytransfer.tablename);
			
			$scope.data.query  = $scope.data.query.replace(/%fields%/, $scope.data.moneytransfer.updatefields);
			
			$scope.data.query  = $scope.data.query.replace(/%_ID%/, $scope.form.moneytransfer._ID);
			
			$scope.moneytransfer.executequery(); 
			
		}; //updatequery function
		
		$scope.data.moneytransfer.selectquery = function () 
		{
			
			//alert("select query called");
			
			$scope.data.query = $scope.data.querytemplate.read;
			
			$scope.data.querytype = 0;
			
			$scope.data.query  = $scope.data.query.replace(/%TABLE_NAME%/, $scope.data.moneytransfer.tablename);
			
			$scope.data.query  = $scope.data.query.replace(/%fields%/, $scope.data.moneytransfer.selectfields);
			
			$scope.moneytransfer.executequery(); 
						
		}; //selectquery function
		
		$scope.data.moneytransfer.vieweventlog = function()
		{
			//alert($scope.data.eventquery);
			$scope.showeventlog = 1; 
			
			$http({
						method: 'POST',
						url: 'http://localhost:8083/mybank/moneytransfer/executequery/',
						dataType: 'json',
						data: {query: $scope.data.eventquery,
								querytype: 0},
						headers: { 'Content-Type': 'application/json; charset=UTF-8' }
					}).then(function successCallback(response) {
							// this callback will be called asynchronously
							// when the response is available
							$scope.msg = "Post Data Submitted Successfully!";
							$scope.moneytransfer.eventlog = response.data;
							//alert(response.data);
							
						  }, function errorCallback(response) {
							$scope.msg = "Service not Exists." + response.data;
							$scope.statusval = response.status;
							$scope.statustext = response.statusText;
							$scope.headers = response.headers();
						  });
						  
		}//account event log
		
		$scope.hideeventlog = function()
		{
			$scope.showeventlog = 0;
		}

	}); /*mainApp.dataController*/