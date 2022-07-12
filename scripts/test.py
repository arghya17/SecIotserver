# from gvm.xml import pretty_print
# from gvmtools.pyshell import Gmp, HELP_TEXT
# with Gmp as gmp:
#     resp = gmp.get_tasks()
# print(resp)

from gvm.connections import UnixSocketConnection
from gvm.protocols.gmp import Gmp

# path to unix socket
path = None
connection = UnixSocketConnection(path=path)

# using the with statement to automatically connect and disconnect to gvmd
with Gmp(connection=connection) as gmp:
    # get the response message returned as a utf-8 encoded string
    response = gmp.get_version()

    # print the response message
    print(response)
