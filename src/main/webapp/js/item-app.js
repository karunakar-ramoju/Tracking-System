var app = angular.module("invenApp", ["ngRoute"]);
app.config(['$routeProvider', '$locationProvider', function ($routeProvider, $locationProvider) {
    $routeProvider
	.when('/',
	      { 
		    controller: 'companiesController',
		    templateUrl :'/inline-companies.html',
		  })
	.when('/create-company'	,
	      { 
		    controller: 'createCompanyController',
		    templateUrl :'/inline-create-company.html',
		  })
	.when('/edit-company'	,
	      { 
		    controller: 'editCompanyController',
		    templateUrl :'/inline-create-company.html',
		  })	
	.when('/perform-action'	,
	      { 
		    controller: 'performActionController',
		    templateUrl :'/inline-perform-action.html',
		  })	
	.when('/create-stock-groups'	,
	      { 
		    controller: 'stockGroupController',
		    templateUrl :'/inline-create-stocks-groups.html',
		  })	
	.when('/create-stock-items'	,
	      { 
		    controller: 'stockItemController',
		    templateUrl :'/inline-create-stocks-items.html',
		  })
	.when('/view-stock-groups'	,
	      { 
		    controller: 'showStockGroupsController',
		    templateUrl :'/inline-view-stock-groups.html',
		  })		  
	.when('/reports',{template:'This is the Report Route'});
}]); 


//
app.run(function($rootScope,$location,$http) {
    $rootScope.countries = [ { id:1, name :"India" } , { id:2, name :"Singapore" }, { id:3, name :"US" },{ id:4, name :"UK" }];
	$rootScope.states = [ { id:1, name :"Andhra Pradesh" } , { id:2, name :"Telangana" }];
	
    //Should load Employees from Backend
	//$rootScope.companies = [ {name:'IBM'},{name:'Cohnizant'},{name:'InfoSys'}]; 
	
	$http.get('http://service-trackingsys.1d35.starter-us-east-1.openshiftapps.com/company/getAll').
			then(function(response) {
				$rootScope.companies = response.data;
	});
	
	/*$rootScope.groups = [ {"name":"Group 1" , id :1, parent: 0} ,{"name":"Group 2" , id :2, parent: 0} ,
	                      {"name":"Group 3" , id :3, parent: 1} ,{"name":"Group 4" , id :4, parent: 1} ,
	                      {"name":"Group 5" , id :5, parent: 2} ,{"name":"Group 6" , id :6, parent: 2} ,
						  {"name":"Group 7" , id :7, parent: 3} ,{"name":"Group 8" , id :8, parent: 4} ,
	                      {"name":"Group 9" , id :9, parent: 5} ,{"name":"Group 10" , id :10, parent: 6} ,
						  {"name":"Group 11" , id :11, parent: 9} ,{"name":"Group 12" , id :12, parent: 10},
						  {"name":"Group 13" , id :13, parent: 11} ,{"name":"Group 14" , id :14, parent: 12},
 						  ];*/
	$http.get('http://service-trackingsys.1d35.starter-us-east-1.openshiftapps.com/company/getAll').
			then(function(response) {
				$rootScope.companies = response.data;
	});					  
	$location.path("/");
						  
});

//
app.controller('companiesController', function($scope,$rootScope,$location,$http) {
	
	$scope.company ={}; 
	
	$scope.createCompany = function(){
		$rootScope.currentPage = 'createCompany';
		$location.path("create-company");
	}
	$scope.editCompany = function(company){
		$rootScope.currentPage = 'editCompany';
		$location.path("edit-company");
		$rootScope.company = company ;
	}
	
	$scope.performAction = function(company){
		$rootScope.currentPage = 'performAction';
		$rootScope.company = company;
		$location.path("perform-action");
	}
});

app.controller('createCompanyController', function($scope,$rootScope,$location,$http) {
	$scope.company ={}; 
	$scope.company.country = 1;	
	$scope.company.state = 1;	
	$scope.company.type =1;
	$scope.optType = "create";
	$scope.company.currencesymbol = "Rs.";
	$scope.submitclick = false;
	
	$scope.createCompany = function(company){
		if(!$scope.companyform.$valid){
			$scope.submitclick = true;
			return;
		}

			var dataObj = JSON.stringify(company);
			$http.post('http://service-trackingsys.1d35.starter-us-east-1.openshiftapps.com/company/create', dataObj, {
			  headers: {
				'Content-Type': 'application/json; charset=UTF-8'
			  },
			}).success(function(responseData) {
				  try {
					console.log(JSON.stringify(responseData));
					$rootScope.currentPage = 'companyList';
					$scope.companies.push(company);
					$location.path("/");
				  } catch (err) {
					alert(JSON.stringify(err));
				  }
			 }).error(function(data, status, headers, config) {
				console.log(JSON.stringify(data) +" headers : "+ JSON.stringify(headers) +"  status : " + status);
			  });		
	}
	
});

app.controller('editCompanyController', function($scope,$rootScope,$location,$http) {

    $scope.optType = "edit";
 	$scope.submitclick = false;

	$scope.editCompany = function(company){
		
		if(!$scope.companyform.$valid){
			$scope.submitclick = true;
			return;
		}		
			var dataObj = JSON.stringify(company);
			$http.post('http://service-trackingsys.1d35.starter-us-east-1.openshiftapps.com/company/create', dataObj, {
			  headers: {
				'Content-Type': 'application/json; charset=UTF-8'
			  },
			}).success(function(responseData) {
				  try {
					console.log(JSON.stringify(responseData));
					$rootScope.currentPage = 'companyList';
					$scope.companies.push(company);
					$location.path("/");
				  } catch (err) {
					alert(JSON.stringify(err));
				  }
			 }).error(function(data, status, headers, config) {
				console.log(JSON.stringify(data) +" headers : "+ JSON.stringify(headers) +"  status : " + status);
			  });
	}
	
});

app.controller('performActionController', function($scope,$rootScope,$location) {
	
	$scope.stockGrpoups = function(company){
		$rootScope.currentPage = 'stockGroups';
		//Back end code to edit Company
		$location.path("/stock-groups");
	}	
	
});

app.controller('stockGroupController', function($scope,$rootScope,$location,$http) {
	$rootScope.currentPage = 'createStockGroups';
	
	$scope.singlegroups = [];
	$scope.singlegroup ={};
    $scope.singlegroup.newgroup	= "";
	$scope.multigroups =[];	
	//Groups data received from backend
	console.log(" Fetching group for Company Id : " + $scope.company.id );
	$http.get('http://service-trackingsys.1d35.starter-us-east-1.openshiftapps.com/group/find-by-company/'+$scope.company.id).
		then(function(response) 
		{
			$rootScope.groups = response.data;
			//$scope.groups = response.data;
			console.log(" Groupth Length : " + $scope.groups.length)			
			angular.forEach($scope.groups, function (group) 
			{
				if(group.parent === 0){
				  $scope.singlegroups.push(group);
				}
			});	
		});	
						  



	$scope.setChildrenData = function(selGroup,grplevel){
		
		    var selGrpId = (selGroup != null && selGroup.id != null ) ? selGroup.id : -1;
			var children = [];
			angular.forEach($scope.groups, function (group) {
				 if(group.parent == selGrpId){
					children.push(group);
					//$scope.multigroups[grplevel].children.push(group);
				 }
			});	
			
			console.log("before : "+ $scope.multigroups.length);
			var tempGrps = [];
			for(i=0;i<grplevel; i++){
				
				if($scope.multigroups[i] != null){
					tempGrps[i]  = $scope.multigroups[i];
				}else{
				 tempGrps[i] = {};
				 tempGrps[i].children = [];
				}
			}
			$scope.multigroups = tempGrps;
			if(selGrpId > 0){
				$scope.multigroups[grplevel] = {};
				$scope.multigroups[grplevel].children = children;
			}
		   // $scope.multigroups[grplevel].children.push(children);
			console.log("After :" + $scope.multigroups.length  +"   "+ children);
	}
	
	$scope.addGroup = function(selGroup,grplevel){
		var newgroup = {};
		newgroup.name = selGroup;
		//newgroup.id = $scope.groups.length;
		newgroup.parent = 0;
		newgroup.company = {};
		newgroup.company.id = $scope.company.id;
		
		if(grplevel == 0){
			//$scope.groups.push(newgroup);
		}else if(grplevel == 1){
			newgroup.parent = $scope.singlegroup.selGroup.id;
		}else{
			newgroup.parent = $scope.multigroups[grplevel-2].selGroup.id;
		}		
		
		var dataObj = JSON.stringify(newgroup);
		console.log(dataObj);
		
		$http.post('http://service-trackingsys.1d35.starter-us-east-1.openshiftapps.com/group/create', dataObj, {
		  headers: {
			'Content-Type': 'application/json; charset=UTF-8'
		  },
		}).success(function(responseData) {
			  try {

					if(grplevel == 0){
						$scope.singlegroups.push(newgroup);
						$scope.groups.push(newgroup);
					}else if(grplevel == 1){
						$scope.multigroups[0].children.push(newgroup);
						$scope.groups.push(newgroup);			
					}else{
						$scope.multigroups[grplevel-1].children.push(newgroup);
						$scope.groups.push(newgroup);			
					}			  
			  } catch (err) {
				console.log(JSON.stringify(err));
			  }
		 }).error(function(data, status, headers, config) {
			console.log(JSON.stringify(data) +" headers : "+ JSON.stringify(headers) +"  status : " + status);
		  });		
	

		console.log(newgroup);
	}
    		
						  
});

app.controller('stockItemController', function($scope,$rootScope,$location,$http) {
	$rootScope.currentPage = 'createStockItems';
	
	//Groups data received from backend
	$scope.stockGroups = [];
	$scope.stockGroups[0] = {};	
	$scope.stockGroups[0].children = [];
	 angular.forEach($scope.groups, function (group) {
			if(group.parent === 0){
			  $scope.stockGroups[0].children.push(group);
			}
		});	

	$scope.setChildrenData = function(selGroup,grplevel){
		
		    var selGrpId = (selGroup != null && selGroup.id != null ) ? selGroup.id : -1;
			var children = [];
			angular.forEach($scope.groups, function (group) {
				 if(group.parent == selGrpId){
					children.push(group);
					//$scope.multigroups[grplevel].children.push(group);
				 }
			});	

			var tempGrps = [];
			for(i=0;i<=grplevel; i++){
				if($scope.stockGroups[i] != null){
					tempGrps[i]  = $scope.stockGroups[i];
				}else{
				 tempGrps[i] = {};
				 tempGrps[i].children = [];
				}
			}
			$scope.stockGroups = tempGrps;
			if(selGrpId > 0 && children.length > 0){
				$scope.stockGroups[grplevel+1] = {};
				$scope.stockGroups[grplevel+1].children = children;
			}
	}
	
	$scope.items = [];
	$scope.items[0] = {'quandity':1 ,'pices':1 };
	$scope.getTotal = function(){
		var total = 0;
		for(var i = 0; i < $scope.items.length; i++){
			var item = $scope.items[i];
			total += (item.quandity * item.pices);
		}
		$scope.grandTotal = total;
		return total;
	}	
	
	$scope.addItem = function(selItem){

	    selItem.id = null;
	    selItem.group = {};
		selItem.group.id = $scope.stockgroup.selGroup.id;
		//selItem.group = $scope.stockgroup.selGroup;
	
		var dataObj = JSON.stringify(newgroup);
		console.log(dataObj);
		
		$http.post('http://service-trackingsys.1d35.starter-us-east-1.openshiftapps.com/group/create', dataObj, {
		  headers: {
			'Content-Type': 'application/json; charset=UTF-8'
		  },
		}).success(function(responseData) {
			  try {

					if(grplevel == 0){
						$scope.singlegroups.push(newgroup);
						$scope.groups.push(newgroup);
					}else if(grplevel == 1){
						$scope.multigroups[0].children.push(newgroup);
						$scope.groups.push(newgroup);			
					}else{
						$scope.multigroups[grplevel-1].children.push(newgroup);
						$scope.groups.push(newgroup);			
					}			  
			  } catch (err) {
				console.log(JSON.stringify(err));
			  }
		 }).error(function(data, status, headers, config) {
			console.log(JSON.stringify(data) +" headers : "+ JSON.stringify(headers) +"  status : " + status);
		  });		
	

		console.log(newgroup);
	}
		
});

app.controller('showStockGroupsController', function($scope,$rootScope,$location) {
		$rootScope.currentPage = 'showStockGroups';

    $scope.groupmap = $scope.groups.map(function(group){ 
		var rObj = {};
		rObj[group.id] = group;
		return rObj;
     });

});
