(function() {
  featureSteps(/^Multiple site support\nAs a Mephisto site owner\nI want to host blogs for different people\nIn order to make gigantic piles of money$/)
    .given(/^a global administrator named "([^"]+)"$/, function (arg1) { })
    .given(/^a blog named "([^"]+)"$/, function (arg1) { })
    .given(/^a customer named "([^"]+)"$/, function (arg1) { })
    .given(/^a blog named "([^"]+)" owned by "([^"]+)"$/, function (arg1, arg2) { })
    .given(/^I am logged in as Dr. Bill$/, function () { })
    .when(/^I try to post to "([^"]+)"$/, function (arg1) { })
    .then(/^I should see "([^"]+)"$/, function (arg1) { })
    .given(/^I should see "([^"]+)"$/, function (arg1) { })
    .given(/^I am logged in as Greg$/, function () { })
})();