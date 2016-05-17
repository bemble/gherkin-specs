(function() {
  featureSteps(/^Multiple site support\nAs a Mephisto site owner\nI want to host blogs for different people\nIn order to make gigantic piles of money$/)
    .given(/^a global administrator named "Greg"$/, function () { })
    .given(/^a blog named "Greg's anti-tax rants"$/, function () { })
    .given(/^a customer named "Dr. Bill"$/, function () { })
    .given(/^a blog named "Expensive Therapy" owned by "Dr. Bill"$/, function () { })
    .given(/^I am logged in as Dr. Bill$/, function () { })
    .when(/^I try to post to "Expensive Therapy"$/, function () { })
    .then(/^I should see "Your article was published."$/, function () { })
    .given(/^I should see "Your article was published."$/, function () { })
    .when(/^I try to post to "Greg's anti-tax rants"$/, function () { })
    .then(/^I should see "Hey! That's not your blog!"$/, function () { })
    .given(/^I am logged in as Greg$/, function () { })
})();