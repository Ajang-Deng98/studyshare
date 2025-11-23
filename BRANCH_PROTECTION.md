# Branch Protection Setup

To complete the CI/CD requirements, configure branch protection rules in GitHub:

## Required Settings

1. Go to **Settings** → **Branches** in your GitHub repository
2. Click **Add rule** for the `main` branch
3. Configure the following:

### Branch Protection Rules
- ✅ **Require a pull request before merging**
- ✅ **Require status checks to pass before merging**
  - Select: `security-and-quality`
- ✅ **Require branches to be up to date before merging**
- ✅ **Require linear history**
- ✅ **Include administrators**

### Status Checks
The following checks must pass before merge:
- `security-and-quality` - Runs security scans and validation
- All CI checks must be green

This ensures that:
1. All code goes through Pull Request review
2. Security scans must pass
3. Infrastructure validation must pass
4. No direct pushes to main branch
5. Full Git-to-Production workflow is enforced

## Testing the Workflow

1. Create a feature branch: `git checkout -b feature/test-change`
2. Make a small change (e.g., update text in frontend)
3. Push and create Pull Request
4. Verify CI checks run and pass
5. Merge PR to trigger deployment
6. Verify change appears on live site