export default function DisplayTeamInfo({ team, tag }) {
  return (
    <div className="md:flex items-center justify-between content-center my-auto">
      <div className="flex-shrink-0 py-3">
        <span className="text-xl sm:text-2xl md:text-3xl leading-none font-bold text-gray-900">
          {team.name}
        </span>
        <h3 className="text-base font-normal text-gray-500">
          {team.Description}
        </h3>
      </div>
      {tag}
    </div>
  );
}
