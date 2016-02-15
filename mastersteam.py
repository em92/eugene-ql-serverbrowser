import valve.source.master_server

msq = valve.source.master_server.MasterServerQuerier()
for address in msq.find(gamedir="baseq3"):
    print "{0}:{1}".format(*address)
