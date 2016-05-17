(() => {
  featureSteps(/^Multiple site support\nAs a Mephisto site owner\nI want to host blogs for different people\nIn order to make gigantic piles of money$/)
    .given(/^a global administrator named "Greg"$/, () => {})
    .given(/^a blog named "Greg's anti-tax rants"$/, () => {})
    .given(/^a customer named "Dr. Bill"$/, () => {})
    .given(/^a blog named "Expensive Therapy" owned by "Dr. Bill"$/, () => {})
    .given(/^I am logged in as Dr. Bill$/, () => {})
    .when(/^I try to post to "Expensive Therapy"$/, () => {})
    .then(/^I should see "Your article was published."$/, () => {})
    .given(/^I should see "Your article was published."$/, () => {})
    .when(/^I try to post to "Greg's anti-tax rants"$/, () => {})
    .then(/^I should see "Hey! That's not your blog!"$/, () => {})
    .given(/^I am logged in as Greg$/, () => {})
})();