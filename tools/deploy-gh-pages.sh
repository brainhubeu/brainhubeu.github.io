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

mkdir -p gh-pages-branch
cd gh-pages-branch

git config --global user.email "devops@brainhub.eu" > /dev/null 2>&1
git config --global user.name "DevOps Brainhub" > /dev/null 2>&1
git init
git remote add origin $remote
git remote -v
git fetch origin

if git rev-parse --verify origin/gh-pages > /dev/null 2>&1
then
  echo 'rev-parse true'
  git checkout gh-pages
  git rm -rf . || echo 'nothing to remove'
  cp -r ../public/* .
else
  echo 'rev-parse false'
  git checkout --orphan gh-pages
  git rm -rf . || echo 'nothing to remove'
  cp -r ../public/* .
fi

git add -A
git commit --allow-empty -m "Deploy to GitHub pages [ci skip]"
git push --force --quiet origin gh-pages

cd ..
rm -rf gh-pages-branch

echo "Finished Deployment of gh pages!"
