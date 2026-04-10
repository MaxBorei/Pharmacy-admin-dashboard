import css from "./DashboardCardInfo.module.css";

type DashboardCardInfoProps = {
  label: string;
  icon: string;
  value: number;
};

export const DashboardCardInfo = ({
  label,
  icon,
  value,
}: DashboardCardInfoProps) => {
  return (
    <div className={css.dashboardPage_container_info}>
      <div className={css.dashboardPage_container_svg_label}>
        <svg className={css.dashboardPage_total_info_svg}>
          <use href={`/sprite.svg#${icon}`}></use>
        </svg>
        <p className={css.dashboardPage_total_info_text}>{label}</p>
      </div>
      <div className={css.dashboardPage_container_value}>
        <p className={css.dashboardPage_value_text}>{value}</p>
      </div>
    </div>
  );
};
