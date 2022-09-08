update admin set revoke_token=current_timestamp,password=%(password)s where id=%(id)s;
commit;