const onUpdateProcedure = `
  CREATE OR REPLACE FUNCTION on_update_timestamp()
  RETURNS trigger AS 
  $$
  BEGIN
    NEW.updated_at = now();
    RETURN NEW;
  END;
  $$ language 'plpgsql';
  `;
const dropOnUpdateProcedure = `DROP FUNCTION on_update_timestamp`;

const onUpdateTrigger = (table) => {
  return `
    CREATE TRIGGER ${table}_updated_at
      BEFORE UPDATE ON ${table}
      FOR EACH ROW
      EXECUTE PROCEDURE on_update_timestamp()`;
};

module.exports = {
  onUpdateProcedure,
  dropOnUpdateProcedure,
  onUpdateTrigger,
};
