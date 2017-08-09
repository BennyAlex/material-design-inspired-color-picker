set -e
echo "Enter release version: "
read VERSION

read -p "Releasing $VERSION - are you sure (y/n)" -n 1 -r
echo #
if [[ $REPLY =~ ^[Yy]$ ]]
then
  echo "Releasing $VERSION ..."

  VERSION=$VERSION npm run build
  git add -A
  git commit -m "[build] Version $VERSION"
  git tag -a v$VERSION -m "Version $VERSION"
  npm version v$VERSION --message "[release] Version $VERSION"

  git push -u origin master
  npm publish
fi
echo "finished"