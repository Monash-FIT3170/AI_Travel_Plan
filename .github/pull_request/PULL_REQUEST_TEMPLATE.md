<!--
     For Work In Progress Pull Requests, please use the Draft PR feature,
     see https://github.blog/2019-02-14-introducing-draft-pull-requests/ for further details.

     For a timely review/response, please avoid force-pushing additional
     commits if your PR already received reviews or comments.

     Before submitting a Pull Request, please ensure you've done the following:
     - 📖 Read the Forem Contributing Guide: https://developers.forem.com/contributing-guide/forem#create-a-pull-request
     - 📖 Read the Forem Code of Conduct: https://github.com/forem/forem/blob/main/CODE_OF_CONDUCT.md
     - 👷‍♀️ Create small PRs. In most cases this will be possible.
     - ✅ Provide tests for your changes.
     - 📝 Use descriptive commit messages.
     - 📗 Update any related documentation and include any relevant screenshots.

     NOTE: Pull Requests from forked repositories will need to be reviewed by
     a Forem Team member before any CI builds will run. Once your PR is approved
     with a `/ci` reply to the PR, it will be allowed to run subsequent builds without
     manual approval.
-->

## What type of PR is this? (check all applicable)

- [ ] Refactor
- [ ] Feature
- [ ] Bug Fix
- [ ] Optimisation
- [ ] Documentation Update

Definitions: 
- Refactor: Improving the code quality, readabililty, or maintainablity of existing code.
- Feature: Adding a new feature or capabilities to the project.
- Bug Fix: Fixing a bug or resolving an issue.
- Optimisation: Improving code or system performance and efficiency.
- Documentation Update: Enhance project documentation to ensure accuracy and usability.
## Description
Briefly describe the purpose and scope of your pull request.

e.g.
This PR resolves the issue where the locations weren't loading on the map on the itinerary page.


## Related Tickets & Documents

<!--
For pull requests that relate or close an issue, please include them
below.  We like to follow [Github's guidance on linking issues to pull requests](https://docs.github.com/en/issues/tracking-your-work-with-issues/linking-a-pull-request-to-an-issue).

For example having the text: "closes #1234" would connect the current pull
request to issue 1234.  And when we merge the pull request, Github will
automatically close the issue.
-->
If your pull request is related to an issue or document, you can link them by using the following keywords:

e.g. Related Issue #99

- Closes #99
- Fixes #99
- Resolves #99

_Any of these three keywords (closes, fixes, resolves) will link the pull request 
to the issue and indicate that the issue will automically be closed when the pull request is merged._

## QA Instructions, Screenshots, Recordings

_Please replace this line with instructions on how to test your changes, a note
on the devices and browsers this has been tested on, as well as any relevant
images and/or recording(s) for UI changes._

e.g.

Testing Instructions:
- Generate an itinerary on the Travel Planner page.
- Verify that the markers load correctly on the map on the Itinerary page.
- Check for any error messages or unexpected behaviour when loading the itinerary page.

Devices/Browsers Tested On:
- Devices: MacBook Pro, Desktop
- Browsers: Google Chrome, Mozilla Firefox

Screenshots for UI Changes:

Before:

![](before_PR.png)

After:

![](after_PR.png)

### UI accessibility checklist

_If your PR includes UI changes, please utilise this checklist:_

- [ ] Semantic HTML implemented?
- [ ] Keyboard operability supported?
- [ ] Checked with [axe DevTools](https://www.deque.com/axe/) and addressed `Critical` and `Serious` issues?
- [ ] Color contrast tested?

_For more info, check out the
[Forem Accessibility Docs](https://developers.forem.com/frontend/accessibility)._

## Added/updated tests?

_We encourage you to keep the code coverage percentage at 80% and above._

- [ ] Yes
- [ ] No, and this is why: _please replace this line with details on why tests
      have not been included_
- [ ] I need help with writing tests