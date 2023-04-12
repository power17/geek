console.log(1)
function log(): number {
	console.debug('before')
	console.log(1)
	console.debug(('after'))
	return 0
}
log()