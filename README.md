# Version reader

Reads from a __version__.py file outputs the value to be used in another workflow step.

Remember the version needs to be surrounded by double quotes in the version file " "

'''
name: Tag repo on version pushed to main
on:
  push:
    branches:
      - 'main'
    files:
      - '__version__.py'
jobs:
  
  tag:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
          
      
      - name: Write the changelog file
        id: version_reader
        uses: simonblund/version-reader@v0.0.2
        
      - name: Create a GitHub release
        uses: ncipollo/release-action@v1
        with:
          tag: v${{ steps.version_reader.outputs.version }}
          name: Release ${{ steps.version_reader.outputs.version }}
          body: ${{ steps.version_reader.outputs.version }} github repository tagged

'''