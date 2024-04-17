mkdir builds
ls -alt
pwd
docker run -v "$PWD:/pwd" ghcr.io/trufflesecurity/trufflehog:latest github --repo https://github.com/trufflesecurity/test_keys --debug  > output.txt
ls -alh
