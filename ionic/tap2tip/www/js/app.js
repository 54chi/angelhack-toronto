var tag = {};

angular.module('T2TApp', ['ionic', 'nfcFilters','ngCordova'])
.controller("MainCtrl",function ($scope, nfcService, $state){
  $scope.tag = nfcService.tag;
  console.log("Main Controller says: Hello World");
})
.controller("ArtistCtrl",function($scope, $ionicPopup, $state){
  //alert(tag.id);

  $scope.confirmationAlert = function() {
     var alertPopup = $ionicPopup.confirm({
       title: 'Tip Artist',
       template: 'Are you sure you want to tip Artist?'
     });

     alertPopup.then(function(res) {
       if (res) {
         $state.go("confirmation");
       } else {
         $state.go("main");
       }
     });
   };
  console.log("Artist Controller says: Hello World");
})
.controller("ConfirmCtrl",function(){
  console.log("Confirmation Controller says: Hello World");
})
.controller("FeedbackCtrl",function(){
  console.log("Feedback Controller says: Hello World");
})
.factory('nfcService', function ($rootScope, $ionicPlatform, $state) {
    $ionicPlatform.ready(function() {
      nfc.addNdefListener(function (nfcEvent) {
          console.log(JSON.stringify(nfcEvent.tag, null, 4));
          $rootScope.$apply(function(){
              angular.copy(nfcEvent.tag, tag);
              alert("Looking for artist info " + tag.id);
              $state.go("artistprofile")
          });
      }, function () {
          console.log("Listening for NDEF Tags.");
      }, function (reason) {
          alert("Error adding NFC Listener " + reason);
      });
    });
    return {
      tag: tag,
      clearTag: function () {
          angular.copy({}, this.tag);
      }
    };
})
.config(function($stateProvider, $urlRouterProvider){
  //basic navigation
  $stateProvider

  .state('main', {
    url: "/main",
    templateUrl: "templates/main.html",
    controller: 'MainCtrl'
  })

  .state('artistprofile', {
    url: "/artistprofile",
    templateUrl: "templates/artistprofile.html",
    controller: 'ArtistCtrl'
  })

  .state('confirmation', {
    url: "/confirmation",
    templateUrl: "templates/confirmation.html",
    controller: 'ConfirmCtrl'
  })

  .state('feedback', {
    url: "/feedback",
    templateUrl: "templates/feedback.html",
    controller: 'FeedbackCtrl'
  })



  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/main');
});


/*
    .controller('T2TController', function($scope, $ionicModal){
      // Create and load the Modal
        $ionicModal.fromTemplateUrl('viewProfile.html', function(modal) {
          $scope.viewProfile = modal;
        }, {
          scope: $scope,
          animation: 'slide-in-up'
        });

        $scope.viewProfile = function() {
          $scope.viewProfile.show();
        };


      }
    )

    .controller('MapController', function($scope, $cordovaGeolocation, $ionicPlatform) {
      $ionicPlatform.ready(function() {
          var posOptions = {
              enableHighAccuracy: true,
              timeout: 20000,
              maximumAge: 0
          };

          $cordovaGeolocation.getCurrentPosition(posOptions).then(function (position) {
              var map={};
              var lat  = position.coords.latitude;
              var long = position.coords.longitude;
              //alert("Lat: " + lat+ ", Long:"+ long);
              map.lat=lat;
              map.long=long;
              $scope.map=map;
            }, function(err) {
              //$ionicLoading.hide();
              console.log(err);
            });
      })
    })



    .controller('MainController', function ($scope, nfcService) {

        $scope.tag = nfcService.tag;
        $scope.clear = function() {
            nfcService.clearTag();
        };



    })

    .factory('nfcService', function ($rootScope, $ionicPlatform) {

        var tag = {};

        $ionicPlatform.ready(function() {
            nfc.addNdefListener(function (nfcEvent) {
                console.log(JSON.stringify(nfcEvent.tag, null, 4));
                $rootScope.$apply(function(){
                    angular.copy(nfcEvent.tag, tag);
                    // if necessary $state.go('some-route')
                });
            }, function () {
                console.log("Listening for NDEF Tags.");
            }, function (reason) {
                alert("Error adding NFC Listener " + reason);
            });

        });

        return {
            tag: tag,

            clearTag: function () {
                angular.copy({}, this.tag);
            }
        };
    });
*/
