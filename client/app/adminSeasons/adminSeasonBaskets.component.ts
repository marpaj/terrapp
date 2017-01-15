'use strict';

const angular = require('angular');


export class AdminSeasonBasketsComponent{
  season: Season;
  $http: ng.IHttpService;

  pickupOptions: Object[];
  selectedPickupOption: Object = null;

  searchString: string;
  searchCandidates: Object[];

  members: Object[];
  baskets: Object[];

  /*ngInjector*/
  constructor($http, $scope, PickupOptionsService) {
    let scope = this;
    scope.$http = $http;
    PickupOptionsService.get().then((pickupOptions) => {
      scope.pickupOptions = pickupOptions;
      scope.selectedPickupOption = _.first(scope.pickupOptions);_
    });
  }

  updateSearch() {
    let scope = this;
    if (this.searchString.length>2) {
      this.$http.post("/api/memberships/find", {query: this.searchString})
        .then(res => {
          scope.members = res.data;
        });
    } else {
      scpoe.members = [];
    }

  }


  createBasket(membership) {
    let scope = this;
    this.$http.post("/api/baskets", {membership: membership._id, season: scope.season._id, defaultPickupOption: scope.selectedPickupOption._id})
      .then(res => {
        scope.baskets.push({_id: res.data._id, membership: membership, season: scope.season._id, defaultPickupOption: scope.selectedPickupOption});
      });
  }

  deleteBasket(basket) {
    let scope = this;
    this.$http.delete("/api/baskets/"+basket._id)
      .then(res => {
        scope.baskets = _.without(scope.baskets, basket);
      });
  }

  $onInit() {
    let resolve = (this as any).resolve;
    if (_.has(resolve, 'season') && resolve.season !== null) {
      this.season = resolve.season;
      this.$http.get("/api/baskets/bySeason/"+this.season._id)
      .then(res => {
        this.baskets = res.data;
      });
    } else {
      // Season is required!
      this.cancel();
    }
  }

  ok() {
    (this as any).close({$value: 'ok'});
  };

  cancel() {
    (this as any).dismiss({$value: 'cancel'});
  };
}


export default angular.module('terrappApp.adminSeasons')
  .component('adminSeasonBaskets', {
    template: require('./adminSeasonBaskets.html'),
    controller: AdminSeasonBasketsComponent,
    controllerAs: '$ctrl',
    bindings: {
      resolve: '<',
      close: '&',
      dismiss: '&'
    },
  }).name;