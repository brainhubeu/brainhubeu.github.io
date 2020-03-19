#!/usr/bin/env bash
set -e

failure() {
  local lineno=$1
  echo "Failed at $lineno"
}
trap 'failure ${LINENO}' ERR

remote=https://$GIT_TOKEN@github.com/brainhubeu/brainhubeu.github.io.git

yarn install --non-interactive
sed -i "s/%page_built_at%/$(date)/g" public/index.html
yarn build

mkdir -p master-branch
cd master-branch

git config --global user.email "devops@brainhub.eu" > /dev/null 2>&1
git config --global user.name "DevOps Brainhub" > /dev/null 2>&1
git init
git remote add origin $remote
git remote -v
git fetch origin

if git rev-parse --verify origin/master > /dev/null 2>&1
then
  echo 'rev-parse true'
  git checkout master
  git rm -rf . || echo 'nothing to remove'
  cp -r ../public/* .
else
  echo 'rev-parse false'
  git checkout --orphan master
  git rm -rf . || echo 'nothing to remove'
  cp -r ../public/* .
fi

git add -A
git commit --allow-empty -m "Deploy to GitHub pages [ci skip]"
git push --force --quiet origin master

cd ..
rm -rf master-branch

echo "Finished Deployment of gh pages!"
